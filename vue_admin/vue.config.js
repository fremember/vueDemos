/*
 * @Author: fremember
 * @Date: 2021-04-26 09:25:57
 * @Description: 
 */
let proxyObj = {};
proxyObj['/api'] = {
    ws: false,
    target: 'https://jw.fangtian.me/',
    changeOrigin: true,
    pathRewrite: {
        '/api': ''
    }
};
module.exports = {
    devServer: {
        host: 'localhost',
        port: 1314,
        proxy: proxyObj
    }
};