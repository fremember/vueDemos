import { App } from 'vue'
import ChooseTime from './src/Time.vue'
import ChooseDate from './src/Date.vue'

export default {
    install(app: App) {
        app.component('f-choose-time', ChooseTime)
        app.component('f-choose-date', ChooseDate)
    }
}