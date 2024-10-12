import { App } from 'vue'
import ModalForm from './src/index.vue'

export default {
    install(app: App) {
        app.component('f-modal-form', ModalForm)
    }
}