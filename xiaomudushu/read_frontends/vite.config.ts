import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11'],
        })
      ]
    }
  },
  plugins: [
    vue(),
    WindiCSS(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  resolve: {
    alias: {
      '@': '/src/'
    }
  },
  server: {
    host: '127.0.0.1', // 这个用于启动
    port: 1315, // 指定启动端口
  //   proxy: {
  //     '/api': {
  //       target: 'http://api.example.com', // 目标服务器的地址
  //       changeOrigin: true, // 是否改变源地址
  //       rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
  //     },
  //   },
  }
})
