import { App } from 'vue'

import ChooseIcon from './ChooseIcon'
import ChooseArea from './ChooseArea'
import Trend from './Trend'
import Notification from './Notification'
import Tab from './Tab'
import MenuList from './MenuList'
import Progress from './Progress'
import ChooseTime from './ChooseTime'
import ChooseCity from './ChooseCity'
import From from './Form'
import ModalForm from './ModalForm'
import Calendar from './Calendar'
import Table from './Table'

const components = [
    ChooseIcon,
    ChooseArea,
    Trend,
    Notification,
    Tab,
    MenuList,
    Progress,
    ChooseTime,
    ChooseCity,
    From,
    ModalForm,
    Calendar,
    Table
]

export default {
    install(app: App) {
        components.map(item => {
            app.use(item)
        })
    }
}