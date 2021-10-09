/*
 * @Author: fremember
 * @Date: 2021-09-16 10:20:59
 * @Description: 按需加载 ant-design-vue 组件
 */

import {
    Button,
    Input,
    Form,
    Checkbox,
    Layout,
    Menu,
    Dropdown,
    Row,
    Col
} from 'ant-design-vue'

// 导出use完ant-design-vue组件的app
export function antd (app: any): any {
    return app
        .use(Button)
        .use(Input)
        .use(Form)
        .use(Checkbox)
        .use(Layout)
        .use(Menu)
        .use(Dropdown)
        .use(Row)
        .use(Col)
}