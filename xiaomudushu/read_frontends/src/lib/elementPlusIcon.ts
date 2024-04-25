import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 注册所有的icon
export default function elementPlusIcon(app: any) {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
    return app
}