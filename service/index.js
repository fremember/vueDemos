/*
 * @Author: fremember
 * @Date: 2021-06-15 11:21:00
 * @Description: express路由中间件入口
 */


const express = require('express'),
    app = express(),
    server = require('http').Server(app),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    JwtUtil = require('./utils/jwt'),
    { checkWhitelist } = require('./lib/common');

const comRouter = require('./routers/common/index.js'),
    userRouter = require('./routers/user/index.js')

// 全局校验接口的token
app.use((req, res, next) => {
    if (!checkWhitelist(req.url)) {// 排除不需要校验token的接口
        let token = req.headers.token,
            jwt = new JwtUtil(token);
        result = jwt.verifyToken()
        // 如果考验通过就next，否则就返回登陆信息不正确
        if (result == 'err') {
            return res.send({ code: 200, message: '登录已过期,请重新登录' })
        } else {
            next();
        }
    } else {
        next();
    }
})

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/common', comRouter)
app.use('/user', userRouter)

server.listen(1413, function () {
    console.log('Node app start at port 1413')
})