import { App } from 'vue'
import MenuList from './src/index.vue'
import infiniteMenu from './src/menu'

export default {
    install (app: App) {
        app.component('f-menu-list', MenuList)
        app.component('f-infinite-menu', infiniteMenu)
    }
}