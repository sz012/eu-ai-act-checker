import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // jsdom - a fake browser in Node so components can render without a real window
    environment: 'jsdom',
    // lets tests use describe/it/expect without importing them everywhere
    globals: true,
    // runs before every test file
    setupFiles: './src/test/setup.js',
  },
})
