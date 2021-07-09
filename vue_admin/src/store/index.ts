/*
 * @Author: fremember
 * @Date: 2021-04-26 09:27:56
 * @Description: 状态管理
 */

import { createStore } from 'vuex'
const files: any = require.context('./modules', false, /\.ts$/),
    modules: any = {};
files.keys().forEach((key: any): void => {
    modules[key.replace(/\.\/|\.ts/g, '')] = files(key).default
})
// 导入所有 vuex 模块，自动加入namespaced:true，用于解决vuex命名冲突
Object.keys(modules).forEach((key: any): void => {
    modules[key]['namespaced'] = true
})

export default createStore({
    modules
})