/*
 * @Author: fremember
 * @Date: 2021-09-28 08:52:28
 * @Description: 
 */

const files: any = require.context('./configs', false, /\.ts$/),
    modules: any = {};
files.keys().forEach((key: any): void => {
    modules[key.replace(/\.\/|\.ts/g, '')] = files(key).default
})

export default { ...modules }