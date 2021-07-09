/*
 * @Author: fremember
 * @Date: 2021-04-26 10:03:19
 * @Description: 公共操作模块
 */
const express = require('express'),
    Router = express.Router();

Router.get('/login', (req, res) => {
    return res.send({ code: 0, msg: 'success' })
})

module.exports = Router