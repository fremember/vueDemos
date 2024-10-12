import { App } from 'vue'
import Tab from './src/index.vue'

export default {
    install (app: App) {
        app.component('f-tab', Tab)
    }
}