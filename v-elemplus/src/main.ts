import { createApp } from 'vue'
import router from './router'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'

import './assets/css/reset.css'
import 'element-plus/dist/index.css'
import './assets/scss/base.scss'
import './assets/scss/ui.scss'

import App from './App.vue'

import { toLine } from './utils'
import localComponent from './components'

// 全局引入组建
// import localComponent from './../lib/f-components'
// import '../lib/style.css'

// 按需引入单组件
// import ChooseIcon from './../lib/ChooseIcon/index'
// import './../lib/ChooseIcon/style.css'

// 验证发布的组件
// import localComponent from 'fremember-components'
// import 'fremember-components/style.css'

import './mock'

const app = createApp(App)

// 全局注册icon 牺牲性能
for (let i in Icons) {
    app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
}

// 全局引入组建
app.use(ElementPlus).use(router).use(localComponent).mount('#app')

// 按需引入单组件
// app
//     .use(ElementPlus)
//     .use(router)
//     .use(ChooseIcon)
//     .mount('#app')

