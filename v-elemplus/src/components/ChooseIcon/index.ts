import { App } from 'vue';
import ChooseIcon from './src/index.vue';

export default {
    install(app: App) {
        app.component('f-choose-icon', ChooseIcon);
    }
}