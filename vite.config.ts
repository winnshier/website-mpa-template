import { resolve } from 'node:path';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

const page = (file: string) => resolve(__dirname, file);

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
      splitVendorChunkPlugin()
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
          index: page('public/templates/index.html'),
          about: page('public/templates/about.html')
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
