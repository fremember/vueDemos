import { createApp } from 'vue'
import store from './store'
import router from './router'
import { directives } from './utils/common'
import App from './App.vue'
import './utils/rem'
import 'virtual:windi.css'
import 'vant/lib/index.css'
import './assets/css/style.css'
import './assets/css/common.css'

import {
	Button,
	NavBar,
	Tabbar,
	TabbarItem,
	Checkbox,
	Toast,
	Icon,
	Popup,
	Swipe,
	SwipeItem,
	List,
	PullRefresh,
	ActionBarIcon,
	Search,
    Loading,
    Field,
    SwipeCell,
    Uploader,
    Form,
    ActionSheet,
    DatePicker,
    Picker,
    CheckboxGroup,
    Dialog,
    Switch,
    RadioGroup,
    Radio
} from 'vant'

directives(createApp(App))
	.use(store)
	.use(router)
	.use(Button)
	.use(NavBar)
	.use(Tabbar)
	.use(TabbarItem)
	.use(Checkbox)
	.use(Toast)
	.use(Icon)
	.use(Popup)
	.use(Swipe)
	.use(SwipeItem)
	.use(List)
	.use(PullRefresh)
	.use(ActionBarIcon)
	.use(Search)
	.use(Loading)
	.use(Field)
	.use(SwipeCell)
	.use(Uploader)
	.use(Form)
	.use(ActionSheet)
	.use(DatePicker)
	.use(Picker)
	.use(CheckboxGroup)
	.use(Dialog)
	.use(Switch)
	.use(RadioGroup)
	.use(Radio)
	.mount('#app')
