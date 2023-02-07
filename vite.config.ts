import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server : {
        proxy : {
            '/api': {
                // target: 'http://128.199.86.217:4000/api',
                target: 'http://localhost:4000/api',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            }
        }
    }
})
