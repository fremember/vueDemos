import { App } from 'vue'
import Table from './src/index.vue'

export default {
    install(app: App) {
        app.component('f-table', Table)
    }
}