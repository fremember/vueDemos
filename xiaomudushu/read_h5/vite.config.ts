import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import WindiCSS from 'vite-plugin-windicss'
import Components from "unplugin-vue-components/vite"
import { VantResolver } from "unplugin-vue-components/resolvers"
import postCssPxToRem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11'],
          grid: true
        }),
        postCssPxToRem({
          // 自适应，px>rem转换
          rootValue: 39, // UI设计稿的宽度/10
          unitPrecision: 3, // 转rem精确到小数点多少位
          propList: ['*'], // 需要转换的属性 *表示所有
          replace: true, // 是否直接更换属性值，而不添加备用属性
          mediaQuery: false, // 是否在媒体查询的css代码中也进行转换
          minPixelValue: 0, // 设置要替换的最小像素值
          exclude: /node_modules/i, // 排除node_modules文件夹下的文件
          selectorBlackList: ['norem'], // 过滤掉norem-开头的class，不进行rem转换，这个内容可以不写
        })
      ]
    }
  },
  plugins: [
    vue(),
    WindiCSS(),
    Components({
      resolvers: [VantResolver()],
    })
  ],
  resolve: {
    alias: {
      '@': '/src/'
    }
  },
  server: {
    host: '127.0.0.1', // 这个用于启动
    port: 1314, // 指定启动端口
    open: true //启动后是否自动打开浏览器
  //   proxy: {
  //     '/api': {
  //       target: 'http://api.example.com', // 目标服务器的地址
  //       changeOrigin: true, // 是否改变源地址
  //       rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
  //     },
  //   },
  }
})
