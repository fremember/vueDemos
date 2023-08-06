# Vue 3 + TypeScript + Vite 学习项目

## 1、新建项目
   1. npm create vite@latest
   2. Project name: 输入项目名称
   3. Select a framework: 选择一个框架
   4. Select a variant: 选择变体(js | ts | nuxt)

## 2、项目运行操作
   1. cd vite-project
   2. 安装依赖：npm install
   3. 开发环境运行：npm run dev

## 3、配置开发代理
   + 主要是在 vite.config.ts 中做修改
   + 添加如下代码：
   ```
   export default defineConfig({
      server: {
         // https: true,// 启用https协议，默认是HTTP协议
         host: true, // 监听所有地址
         port: 1314,// 前端项目启动的端口号
         open: true,// 开启代理
         cors: false, // 为开发服务器配置 CORS
         proxy: {
            '^/api': {
               target: '',// 服务器地址
               changeOrigin: true,// 开启代理
               ws: true,  // 开启 websockets 代理
               rewrite: (path) => path.replace(/^\/api/, '')// 请求接口重写
            }
         }
      }
   })
   ```

## 4、使用环境变量配置开发代理
   + 配置 .env，.env.development，.env.production文件
   ```
      #  跨域 -- 前端开发时接口前缀
      VUE_APP_BASE_API = '^/api' 
      #  地址 -- 服务器接口地址
      VUE_APP_BASE_URL = '接口地址'
   ```
   + 主要是在 vite.config.ts 中做修改
   + 添加如下代码：
   ```
      import type { UserConfig, ConfigEnv } from 'vite'
      import { defineConfig, loadEnv } from 'vite'

      export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
         const root = process.cwd()
         // 加载环境变
         const env = loadEnv(mode, root, '')
         const { VUE_APP_BASE_API, VUE_APP_BASE_URL } = env

         return {
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
            }  
         }
      })
   ```

## 5、解决 ts 引入 .vue 文件报找不到模块的问题
   1. 在 src 目录下新建 vue.d.ts 文件，并输入以下代码
      ```
         declare module '*.vue' {
            import type { DefineComponent } from 'vue'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
            const component: DefineComponent<{}, {}, any>
            export default component
         }
      ```
   2. 修改 tsconfig.json 文件
      "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue", "vue.d.ts"],

## 6、配置 scss 并使用
   1. 安装依赖 sass 和 sass-loader
      ` npm install sass sass-loader --save-dev `
   2. 在 vite.config.ts 中配置
      ```
      export default defineConfig({
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
      })
      ```

## 7、配置 vue-router 和使用
   1. 安装依赖 ` npm install vue-router@next --save `
   2. 改造 App.vue 文件
      ```
         <template name="App">
            <router-view />
         </template>
      ```
   3. 改造 main.ts 文件
      ```
         import { createApp } from 'vue'
         import router from './router'
         import App from './App.vue'

         createApp(App).use(router).mount('#app')
      ```
   4. 新建 router/index.ts 文件，并注册路由信息
      ```
         import { createRouter, createWebHashHistory } from 'vue-router'
         import type { RouteRecordRaw } from 'vue-router'

         const routes: RouteRecordRaw[] = [
            {
               path: '/',
               redirect: '/login',
            },
            {
               path: '/login',
               name: 'LoginView',
               component: () => import('@/views/LoginView/index.vue'),
               meta: {
                     title: 'Login'
               }
            },
            {
               path: '/home',
               name: 'HomeView',
               component: () => import('@/views/HomeView/index.vue'),
               meta: {
                     title: 'Home'
               }
            }
         ];

         const router = createRouter({
            history: createWebHashHistory('/'),
            routes: routes,
            strict: true,
            scrollBehavior: () => ({ left: 0, top: 0 })
         })

         export default router
      ```

## 8、配置 pinia 和使用
   1. 安装依赖 ` npm install pinia --save `
   2. 改造 main.ts 文件
      ```
         import { createApp } from 'vue'
         import router from './router'
         import { createPinia } from 'pinia'

         import App from './App.vue'

         const pinia = createPinia()

         createApp(App).use(router).use(pinia).mount('#app')
      ```
   3. 新建 store/index.ts 文件，并注册状态
      ```
         import { defineStore } from 'pinia'

         interface StateInterface {
            token: string
         }

         export const commonStore = defineStore('common', {
            state: (): StateInterface => {
               return {
                     token: '11'
               }
            },
            getters: {
               headerToken: (state: StateInterface) => `header ${state.token}`
            },
            actions: {
               changeToken (token: string) {
                     this.token = token
               }
            }
         })
      ```
   4. 组件中使用(在login.vue中测试)
      ```
         <template name="LoginView">
            <section class="login-view">
               <p @click="changeRouter">login-view</p>
               <p @click="changeToken">修改token：{{ common.token }}</p>
               <p>修改token：{{ common.headerToken }}</p>
            </section>
         </template>

         <script setup lang="ts">

            import { useRouter } from 'vue-router'
            import { commonStore } from '@/store'

            const router = useRouter();

            const common = commonStore();

            const changeRouter = () => {
               router.push('/home')
            };
            const changeToken = () => {
               common.changeToken(`${Math.random()}`)
            };
         </script>
      ```

## 9、配置 pinia 持久化
   1. 安装依赖 ` npm install pinia-plugin-persistedstate -dev `
   2. 改造 main.ts 文件
      ```
         import { createApp } from 'vue'
         import router from './router'
         import pinia from './store'

         import App from './App.vue'

         createApp(App).use(router).use(pinia).mount('#app')
      ```
   3. 改造 store/index.ts 文件，并将状态相关逻辑放在modules中
      ```
         import { createPinia } from 'pinia'
         import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

         const pinia = createPinia()
         pinia.use(piniaPluginPersistedstate)

         export default pinia
      ```
   4. 改造 store/modules/index.ts 文件
      ```
         import { defineStore } from 'pinia'

         interface StateInterface {
            token: string
         }

         export const commonStore = defineStore('common', {
            state: (): StateInterface => {
               return {
                     token: '11'
               }
            },
            getters: {
               headerToken: (state: StateInterface) => `header ${state.token}`
            },
            actions: {
               changeToken (token: string) {
                     this.token = token
               }
            },
            persist: true
         })

      ```

## 10、配置页面展示进度动画
   1. 安装依赖 
      ```
         npm install nprogress --save
         npm install  @types/nprogress -dev
      ```
   2. 配置全局路由守卫，新建 src/lib/routerAuth.ts
      ```
         import router from '@/router'
         import nProgress from 'nprogress'
         import 'nprogress/nprogress.css'

         nProgress.configure({
            showSpinner: false
         })

         // 全局前置守卫
         router.beforeEach(() => {
            nProgress.start()
            return true
         })

         // 全局后置守卫
         router.afterEach(() => {
            nProgress.done(true)
         })
      ```
   3. 改造 main.ts 文件，在文件中引入 ` import '@/lib/routerAuth' `

## 11、配置 vue vue-router 自动引入无需每次都引入
   1. 安装依赖
      ```
         npm i unplugin-auto-import -dev
         npm i unplugin-vue-components -dev
      ```
   2. 修改 vite.config.ts 文件
      ```
         import AutoImport from 'unplugin-auto-import/vite'
         import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
         import Components from 'unplugin-vue-components/vite'

         export default defineConfig({
            plugins: [
               vue(),
               AutoImport({
                  imports: ['vue', 'vue-router'],
                  resolvers: [ElementPlusResolver()]
               }),
               Components({
                  resolvers: [ElementPlusResolver()],
               })
            ]
         })
      ```

## 12、Vue3 setup 语法糖下如何定义组件名称
   1. 安装依赖
      ```
         npm install vite-plugin-vue-setup-extend -dev
      ```
   2. 修改 vite.config.ts 文件
      ```
         import VueSetupExtend from 'vite-plugin-vue-setup-extend' 

         export default defineConfig({
            plugins: [
               vue(),
               VueSetupExtend()
            ]
         })
      ```
   3. 使用的时候就在 script 标签上加上 name="xxx" 即可
   4. 在浏览器插件 Vue.js-devtools 中查看，组建名称就会被命名成 xxx

## 13、配置 vue组建、Vite、element-plus、Webpack、Rollup 和 esbuild的按需自动导入 API
   1. 安装依赖
      ```
         npm install element-plus --save
         npm install -dev unplugin-auto-import unplugin-vue-components
      ```
   2. 修改 vite.config.ts ，引入插件后，在 plugins 添加代码
      ```
         import AutoImport from 'unplugin-auto-import/vite' // 自动引入无需每次都引入
         import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
         import Components from 'unplugin-vue-components/vite'

         plugins: [
            AutoImport({
                  imports: ['vue', 'vue-router'],
                  resolvers: [ElementPlusResolver()],
                  dts: "src/auto-import.d.ts",
                  eslintrc: { enabled: true }
            }),
            Components({
                  resolvers: [ElementPlusResolver()],
            })
         ]
      ```

## 14、配置 axios
   1. 安装依赖
      ```
         npm install axios --save
      ```
   2. 配置拦截，新建 src/utils/axios
      ```
         import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

         /**
         * axios的二次封装
         */
         const service: AxiosInstance = axios.create({
            baseURL: '/api'
         })

         service.interceptors.request.use((config: AxiosRequestConfig) => {
            config['headers']['Content-Type'] = 'application/json; charset=UTF-8';
            return config
         }, (err: AxiosError) => {
            return Promise.reject(err)
         })

         service.interceptors.response.use((response: AxiosResponse) => {
            return response.request.responseType == 'blob' ? response.data : response.data.data
         }, (err: AxiosError) => {
            return Promise.reject(err)
         })

         export default service
      ```

## 15、配置 json-server 测试接口
   1. 全局安装 json-server ，也可在项目中安装
      ```
         npm install -g json-server
      ```
   2. 配置数据源，使用 json 文件
      ```
         {
            "students": [
               {
                  "id": "1",
                  "no": "20230806",
                  "name": "小红",
                  "gender": "女",
                  "mobile": "138****3456"
               },
               {
                  "id": "2",
                  "no": "20230807",
                  "name": "小刚",
                  "gender": "男",
                  "mobile": "158****7563"
               }
            ],
            "subject": [
               {
                  "id": "1",
                  "name": "计算机应用科学",
                  "total": 30,
                  "teacher": "章鱼怪",
                  "students": 45
               },
               {
                  "id": "2",
                  "name": "高数",
                  "total": 36,
                  "teacher": "李勤",
                  "students": 36
               }
            ]
         }
      ```
   3. 启动 “数据库” 进入新建 json 文件的目录下
      ```
         json-server xxx.json
      ```
   4. 接口请求
      ```
         http://localhost:3000/students
         http://localhost:3000/students?id=1
         http://localhost:3000/subject
      ```

## 16、组件开发用例
   ```
      <template>
         <section class="login-view">
            <p @click="changeRouter">login-view</p>
            <p @click="changeToken">修改token：{{ common.token }}</p>
            <p>修改token：{{ common.headerToken }}</p>
            <p @click="asd = Math.random()">测试不引入vue, 点击修改响应式数据：{{ asd }}</p>
            <el-button type="primary" @click="clearInput">哈哈</el-button>
            <el-input v-model="input" placeholder="Please input" />
         </section>
      </template>

      <script setup lang="ts" name="LoginView">
         import { commonStore } from "@/store/modules";

         import service from '@/utils/axios'


         const common = commonStore();
         const asd = ref(0);
         const input = ref('asd');
         const clearInput = (): void => {
            input.value = ''
         }

         const changeRouter = () => {
            service.get('/students')
            .then((res) => {
               console.log(res)
            })
            .catch(err => {
               console.log(err)
            })
         };
         const changeToken = () => {
            common.changeToken(`${Math.random()}`);
         };
      </script>
   ```