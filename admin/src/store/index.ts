/*
 * @Author: fremember
 * @Date: 2021-09-15 14:31:52
 * @Description: 状态管理器
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
