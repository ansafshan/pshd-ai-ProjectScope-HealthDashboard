import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Fixed package name here

export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@google') || id.includes('firebase')) {
              return 'vendor-core'; 
            }
            return 'vendor'; 
          }
        }
      }
    }
  }
})