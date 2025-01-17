import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Ensure the server binds to all interfaces (public IPs)
    port: process.env.PORT || 5173, // Use the PORT environment variable (Render will set this automatically)
  },
})
