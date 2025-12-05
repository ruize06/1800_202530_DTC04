import { defineConfig } from 'vite'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        main: resolve(__dirname, 'main.html'),
        todo: resolve(__dirname, 'todo.html'),
        profile: resolve(__dirname, 'profile.html'),
        login: resolve(__dirname, 'login.html'),
        sharepage_Groups: resolve(__dirname, 'sharepage_Groups.html'),
      }
    }
  },

  plugins: [
    tailwindcss(),
  ],
})