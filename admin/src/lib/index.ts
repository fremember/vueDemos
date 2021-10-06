/*
 * @Author: fremember
 * @Date: 2021-09-28 08:18:35
 * @Description: 加载插件
 */

const requirePlugin = require.context('./plugins', true, /\.ts$/)
requirePlugin.keys().forEach(fileName => {
    requirePlugin(fileName)
})