import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // The port for your Vite development server
    proxy: {
      "/api": {
        target: "http://localhost:5001", // The backend server address
        changeOrigin: true, // Changes the origin to match the target URL
      },
    },
  },
});
