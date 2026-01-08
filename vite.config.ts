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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
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
        input: {
          index: page('index'),
          about: page('about')
        },
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
