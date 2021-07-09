/*
 * @Author: fremember
 * @Date: 2021-06-15 11:21:41
 * @Description: 公共操作模块
 */
const express = require('express'),
    Router = express.Router(),
    svgCaptcha = require('svg-captcha'),
    encry = require('./../../utils/encryption');

Router
    .post('/getImgVerify', (req, res) => {
        let data = { ...req.body },
            code = svgCaptcha.create(data);
        res.cookie('randomcode', encry.md5(code.text.toLowerCase()))
        return res.json({ code: 0, data: code.data, message: '验证码获取成功' })
    })


module.exports = Router