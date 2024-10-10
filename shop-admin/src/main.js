import { createApp } from 'vue'
import { router } from './router'
import store from './store'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 全局引入图标icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'virtual:windi.css'
import 'nprogress/nprogress.css'

import './utils/permission'

import permission from './directives/permission.js'

const app = createApp(App)

// 全局使用图标icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(store).use(router).use(ElementPlus).use(permission).mount('#app')
