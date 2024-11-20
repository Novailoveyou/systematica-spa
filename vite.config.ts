import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ehdapi': {
        target: 'https://data.mos.ru',
        changeOrigin: true,
        secure: true,
        rewrite: path => path.replace(/^\/ehdapi/, '/ehdapi')
      }
    }
  }
});
