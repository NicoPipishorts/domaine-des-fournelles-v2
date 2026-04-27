import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.REACT_APP_URL || env.VITE_REACT_APP_URL || env.VITE_API_URL || '';

  return {
    plugins: [react()],
    build: {
      outDir: 'build',
    },
    define: {
      'process.env.REACT_APP_URL': JSON.stringify(apiUrl),
    },
  };
});
