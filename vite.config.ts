import { existsSync, readdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

const toFlatHtmlName = (fileName: string) => {
  const normalized = fileName.replace(/\\/g, '/');
  if (normalized.endsWith('/index.html')) {
    const parentDir = basename(dirname(normalized));
    if (parentDir && parentDir !== 'index') {
      return `${parentDir}.html`;
    }
  }
  return basename(normalized);
};

const flattenHtmlOutput = () => ({
  name: 'flatten-html-output',
  apply: 'build' as const,
  enforce: 'post' as const,
  generateBundle(_: unknown, bundle: Record<string, { type: string; fileName: string }>) {
    const htmlEntries = Object.entries(bundle).filter(
      ([name, chunk]) => chunk.type === 'asset' && name.endsWith('.html')
    );

    for (const [originalName, chunk] of htmlEntries) {
      const flatName = toFlatHtmlName(originalName);
      if (flatName === originalName) continue;
      if (bundle[flatName]) {
        throw new Error(`Duplicate HTML output filename detected: ${flatName}`);
      }
      chunk.fileName = flatName;
      bundle[flatName] = chunk;
      delete bundle[originalName];
    }
  }
});

const page = (name: string) => resolve(__dirname, `src/pages/${name}/index.html`);

/**
 * Automatically discovers all HTML entry points in src/pages.
 * Scans for directories containing index.html files.
 * This eliminates the need to manually update configuration when adding new pages.
 */
const discoverHtmlEntries = () => {
  const pagesDir = resolve(__dirname, 'src/pages');
  const entries: Record<string, string> = {};

  const pageDirs = readdirSync(pagesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .sort();

  for (const dirName of pageDirs) {
    const htmlFile = page(dirName);
    if (existsSync(htmlFile)) {
      entries[dirName] = htmlFile;
    }
  }

  if (!Object.keys(entries).length) {
    throw new Error('[html-entries] No HTML entry files found under src/pages');
  }

  return entries;
};

/**
 * HTML entry points mapping for both build and dev server.
 * Keeps development and production routing perfectly aligned.
 */
const htmlEntries = discoverHtmlEntries();

/**
 * Builds a route map from HTML entries for dev server rewriting.
 * Maps /index.html → src/pages/index/index.html, etc.
 */
const buildHtmlRouteMap = (entries: Record<string, string>) => {
  const routes = new Map<string, string>();
  for (const filePath of Object.values(entries)) {
    const route = `/${toFlatHtmlName(filePath)}`;
    if (routes.has(route)) {
      throw new Error(`[html-entry-dev-rewrite] Duplicate HTML route detected: ${route}`);
    }
    routes.set(route, filePath);
  }
  return routes;
};

/**
 * Vite plugin that rewrites HTML entry requests in development mode.
 * Allows accessing /index.html, /about.html, /tech.html directly,
 * while the actual HTML files are in src/pages/{name}/index.html.
 *
 * This ensures consistent routing between dev and production builds.
 */
const htmlEntryDevRewrite = (entries: Record<string, string>) => {
  const routeMap = buildHtmlRouteMap(entries);

  return {
    name: 'html-entry-dev-rewrite',
    apply: 'serve' as const,
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Early exit for invalid requests
        if (!req.url) {
          return next();
        }

        // Only handle GET and HEAD requests
        const method = (req.method || 'GET').toUpperCase();
        if (method !== 'GET' && method !== 'HEAD') {
          return next();
        }

        // Parse and normalize URL pathname
        let pathname: string;
        try {
          const url = new URL(req.url, 'http://localhost');
          pathname = url.pathname || '/';
        } catch {
          return next();
        }

        // Redirect root to index.html
        if (pathname === '/' || pathname === '') {
          pathname = '/index.html';
        }

        // Only process .html requests
        if (!pathname.endsWith('.html')) {
          return next();
        }

        // Check if this is a known HTML entry point
        const entryPath = routeMap.get(pathname);
        if (!entryPath) {
          return next();
        }

        // Read, transform and serve the HTML file
        try {
          const rawHtml = await readFile(entryPath, 'utf-8');
          const transformedHtml = await server.transformIndexHtml(
            pathname,
            rawHtml,
            req.originalUrl || req.url
          );

          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');

          // Handle HEAD requests (no body)
          if (method === 'HEAD') {
            res.end();
            return;
          }

          res.end(transformedHtml);
        } catch (error) {
          const details = error instanceof Error ? error.message : String(error);
          server.config.logger.error(
            `[html-entry-dev-rewrite] Failed to serve ${pathname}: ${details}`
          );
          res.statusCode = 500;
          res.end('Internal Server Error');
        }
      });
    }
  };
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      htmlEntryDevRewrite(htmlEntries),
      react(),
      legacy({
        targets: ['defaults', 'not IE 11'],
        renderLegacyChunks: true,
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      }),
      splitVendorChunkPlugin(),
      flattenHtmlOutput()
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    define: {
      __BUILD_ENV__: JSON.stringify(env.APP_ENV || mode)
    },
    css: {
      postcss: './postcss.config.js'
    },
    build: {
      target: 'es2019',
      outDir: 'dist',
      rollupOptions: {
        input: htmlEntries,
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              if (id.includes('swiper') || id.includes('framer-motion')) {
                return 'interactive';
              }
              return 'vendor';
            }
          }
        }
      }
    },
    server: {
      port: Number(env.VITE_PORT) || 5173,
      open: '/index.html'
    },
    preview: {
      port: 4173
    }
  };
});
