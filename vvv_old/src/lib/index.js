/*
 * @Author: fremember
 * @Date: 2021-06-16 11:27:55
 * @Description: 插件入口
 */

let requirePlugin = require.context('./plugins', true, /\.js$/)
requirePlugin.keys().forEach(fileName => {
    requirePlugin(fileName)
})