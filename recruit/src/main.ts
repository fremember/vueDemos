import { createApp } from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import './utils/rem'
import './assets/css/style.css'
import 'virtual:windi.css'
import {
	Button,
	NavBar,
	Tabbar,
	TabbarItem,
	Checkbox,
	Toast,
	Icon
} from 'vant'

createApp(App)
	.use(store)
	.use(router)
	.use(Button)
	.use(NavBar)
	.use(Tabbar)
	.use(TabbarItem)
	.use(Checkbox)
	.use(Toast)
	.use(Icon)
	.mount('#app')
