import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 8002,
    host: '0.0.0.0',
    open: true,
    proxy:{
      '/api/upload':'https://mobile.zcwytd.com',
      '/api':'https://api.imooc.zcwytd.com'
    },
    cors: true
  },
})
