import { App } from 'vue'
import * as Icons from '@element-plus/icons-vue'
import { toLine } from './utils'

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

import './styles/base.scss'
import './styles/ui.scss'

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
        // 全局注册icon 牺牲性能
        for (let i in Icons) {
            app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
        }
        components.map(item => {
            app.use(item)
        })
    }
}