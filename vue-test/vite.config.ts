import type { UserConfig, ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite' // 自动引入无需每次都引入
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import path from 'path'

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
    const root = process.cwd()
    // 加载环境变
    const env = loadEnv(mode, root, '')
    const { VUE_APP_BASE_API, VUE_APP_BASE_URL } = env
    return {
        plugins: [
            vue(),
            VueSetupExtend(),
            AutoImport({
                imports: ['vue', 'vue-router'],
                resolvers: [ElementPlusResolver()],
                dts: "src/auto-import.d.ts",
                eslintrc: { enabled: true }
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            })
        ],
        server: {
            // https: true,// 启用https协议，默认是HTTP协议
            host: true, // 监听所有地址
            port: 1314,// 前端项目启动的端口号
            open: true,// 开启代理
            cors: false, // 为开发服务器配置 CORS
            proxy: {
                [VUE_APP_BASE_API]: {
                    target: VUE_APP_BASE_URL,// 服务器地址
                    changeOrigin: true,// 开启代理
                    ws: true,  // 开启 websockets 代理
                    rewrite: (path) => path.replace(new RegExp(VUE_APP_BASE_API), '')// 请求接口重写
                }
            }
        },
        resolve: {
            alias: {// 配置全局相对路径
                '@': path.resolve(__dirname, 'src')
            }
        },
        css: {
            preprocessorOptions: {
                scss: {// 导入scss的全局默认配置
                    additionalData: '@import "@/assets/scss/index.scss";'
                }
            }
        }
    }
})
