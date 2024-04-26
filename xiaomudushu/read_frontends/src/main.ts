import { createApp } from 'vue'
import { createPinia } from 'pinia'
import  elementPlusIcon from './lib/elementPlusIcon'

import router from './router'
import App from './App.vue'
import 'virtual:windi.css'


const app = createApp(App),
    pinia = createPinia();

elementPlusIcon(app).use(router).use(pinia).mount('#app')
