/*
 * @Author: fremember
 * @Date: 2021-04-26 09:25:57
 * @Description: 接口解决跨域
 */
let proxyObj = {};
proxyObj['/api'] = {
    ws: true,
    target: 'http://127.0.0.1:1413',
    changeOrigin: true,
    pathRewrite: {
        '/api': ''
    }
};
module.exports = {
    lintOnSave: false,
    devServer: {
        host: '127.0.0.1',
        port: 1314,
        proxy: proxyObj
    }
};