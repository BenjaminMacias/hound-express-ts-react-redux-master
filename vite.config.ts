import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/hound-express-ts-react-redux-master/', // 👈 importante para GitHub Pages
  plugins: [react()],
})
