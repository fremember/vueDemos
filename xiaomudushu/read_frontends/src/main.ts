import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import 'virtual:windi.css'
import  elementPlusIcon from './lib/elementPlusIcon'

const app = createApp(App)

elementPlusIcon(app).use(router).mount('#app')
