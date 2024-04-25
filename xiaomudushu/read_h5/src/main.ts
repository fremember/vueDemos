import { createApp } from 'vue'
import router from './router'
import 'amfe-flexible'
import App from './App.vue'
import 'virtual:windi.css'
import installVant from './utils/vant'
import './assets/font/iconfont.css'

const app = createApp(App)

installVant(app).use(router).mount('#app')
