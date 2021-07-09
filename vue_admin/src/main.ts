/*
 * @Author: fremember
 * @Date: 2021-05-13 18:01:02
 * @Description: 启动的主文件
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import './assets/css/reset.css'
import './assets/css/common.css'
import './assets/css/commonVar.css'
import './assets/css/mine-antd-css.css'

createApp(App).use(store).use(router).use(Antd).mount('#app')
