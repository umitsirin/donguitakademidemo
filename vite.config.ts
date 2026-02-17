import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Fix: Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    // By default loadEnv loads variables with VITE_ prefix.
    // We cast process to any to avoid TypeScript errors if Node types are missing/conflicting
    const env = loadEnv(mode, (process as any).cwd ? (process as any).cwd() : '.');

    return {
        base: '/donguitakademidemo/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // Polyfill process.env with actual env variables to prevent undefined errors
        // and allow fallback access via process.env.VITE_...
        'process.env': JSON.stringify(env),
        global: 'window',
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
