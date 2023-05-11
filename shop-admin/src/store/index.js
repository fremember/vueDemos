import { createStore } from 'vuex'
/*
const files = require.context('./modules', false, /\.js$/),
    modules = {};

files.keys().forEach(key => {
    modules[key.replace(/\.\/|\.js/g, '')] = files(key).default
})
*/

const files = import.meta.globEager('./modules/*.js'),
    modules = {};

for (const key in files) {
    modules[key.replace(/(\.\/modules\/|\.js)/g, '')] = files[key].default
}

// 导入所有 vuex 模块，自动加入namespaced:true，用于解决vuex命名冲突
Object.keys(modules).forEach(key => {
    modules[key]['namespaced'] = true
})

export default createStore({
    modules
})
