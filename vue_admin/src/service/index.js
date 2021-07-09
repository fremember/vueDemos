/*
 * @Author: fremember
 * @Date: 2021-04-26 09:56:31
 * @Description: express路由中间件入口
 */
const express = require('express'),
    app = express(),
    server = require('http').Server(app);

const comRouter = require('./routers/common')

app.use('/common', comRouter)

server.listen(1413, function () {
    console.log('Node app start at port 1413')
})