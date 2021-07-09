/*
 * @Author: fremember
 * @Date: 2021-06-15 08:42:27
 * @Description: main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getStorage } from '@/util/accessToken.js'
import commonSettings from '@/config'

// 加载插件
import '@/lib'

import './assets/css/reset.css'
import './assets/css/common.css'
import './assets/css/var.css'
import './assets/css/mineAntd.css'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

let  { prefix } = commonSettings,
    token = getStorage(`${prefix}token`, 1),
    rolename = getStorage(`${prefix}rolename`, 1),
    username = getStorage(`${prefix}username`, 1);
store.dispatch('user/setAccessToken', token)
store.dispatch('user/setRolename', rolename)
store.dispatch('user/setUsername', username)
store.dispatch('router/setRoutes', rolename)

createApp(App).use(store).use(router).use(Antd).mount('#app')
