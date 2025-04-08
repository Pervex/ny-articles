import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import eslint from 'vite-plugin-eslint2';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    eslint(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
    },
  },
} as UserConfig);
