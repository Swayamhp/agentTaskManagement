import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


//added tailwind css 
export default defineConfig({
  plugins: [react(),tailwindcss()],
      

})
