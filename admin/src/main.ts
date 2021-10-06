/*
 * @Author: fremember
 * @Date: 2021-09-15 14:31:52
 * @Description: 项目入口文件
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/reset.css'
import './assets/css/common.css'
import './assets/css/antd.css'
// 实现 ant-design-vue 按需加载
import { antd } from './antd'

// 加载插件
import '@/lib'

antd(createApp(App).use(store).use(router)).mount('#app')
