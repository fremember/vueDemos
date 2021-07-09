/*
 * @Author: fremember
 * @Date: 2021-06-17 11:00:47
 * @Description: 用户相关路由中间件
 */

const express = require('express'),
    Router = express.Router(),
    JwtUtil = require('./../../utils/jwt'),
    encry = require('./../../utils/encryption'),
    utils = require('utility'),

    formidable = require('formidable'),

    BaseMongodb = require('./../../utils/mongodb/index'),
    baseMongodb = new BaseMongodb(),
    status = require('./../../commonStatus.js'),
    fs = require('fs'),
    tableName = 'users';



Router
    .get('/checkUsername', (req, res) => {
        let whereJson = { ...req.query },
            orderByJson = {},
            limitJson = {
                pageNum: 1,// 下标从1开始
                pageSize: 10
            },
            fieldsJson = {};
        baseMongodb.find(tableName, whereJson, orderByJson, limitJson, fieldsJson, (ret) => {
            if(ret.length > 0) {
                return res.json(status.code_1)
            } else {
                return res.json({ code: 0, msg: '用户名可用' })
            }
        })
    })
    .post('/register', (req, res) => {
        let { username, userpwd, verificationCode } = req.body,
            { randomcode } = req.cookies;
        if (randomcode === encry.md5(verificationCode)) {
            // baseMongodb.insert(tableName, { username, userpwd: utils.sha256(userpwd), rolename: 'editer' }, (ret) => {
            // 角色需要在用户列表中，又超级管理员指派
            baseMongodb.insert(tableName, { username, userpwd: utils.sha256(userpwd) }, (ret) => {
                if (ret) {
                    let { n } = ret.result
                    if(n == 1) {// 注册成功
                        res.json({ code: 0, msg: '注册成功' })
                    } else {
                        res.json(status.code_3)
                    }
                } else {
                    res.json(status.code_3)
                }
            })
        } else {
            return res.json(status.code_2)
        }
    })
    .post('/updatePwd', (req, res) => {
        let { username, userpwd, verificationCode, type } = req.body,
            { randomcode } = req.cookies;
        if (randomcode === encry.md5(verificationCode)) {
            baseMongodb.modify(tableName, { username }, { userpwd: utils.sha256(userpwd) }, (ret) => {
                if(ret) {
                    res.json({ code: 0, msg: `${type == 1 ? '修改密码' : '密码重置'}成功` })
                } else {
                    res.json(status.code_4)
                }
            })
        } else {
            return res.json(status.code_2)
        }
    })
    .post('/login', (req, res) => {
        let { username, userpwd, verificationCode } = req.body,
            { randomcode } = req.cookies,
            whereJson = { username, userpwd: utils.sha256(userpwd) },
            orderByJson = {},
            limitJson = {
                pageNum: 1,// 下标从1开始
                pageSize: 10
            },
            fieldsJson = {};
        if (randomcode === encry.md5(verificationCode)) {
            baseMongodb.find(tableName, whereJson, orderByJson, limitJson, fieldsJson, (ret) => {
                if(ret && Array.isArray(ret) && ret.length > 0) {
                    let doc = ret[0],
                        _id = doc._id.toString(),
                        jwt = new JwtUtil(_id),// 将用户id传入并生成token
                        token = jwt.generateToken();
                    res.clearCookie('randomcode')
                    delete doc.userpwd
                    res.cookie('cookieToken', token)
                    return res.send({ code: 0, msg: '登录成功', data: { ...doc, token: token } })// 将 token 返回给客户端
                } else {
                    // 判断用户名是否输入正确
                    baseMongodb.find(tableName, { username }, orderByJson, limitJson, fieldsJson, (ret1) => {
                        if (ret1 && Array.isArray(ret1) && ret1.length > 0) {
                            return res.send(status.code_7)
                        } else {
                            baseMongodb.find(tableName, { userpwd: utils.sha256(userpwd) }, orderByJson, limitJson, fieldsJson, (ret2) => {
                                if (ret2 && Array.isArray(ret2) && ret2.length > 0) {
                                    return res.send(status.code_6)
                                } else {
                                    return res.json(status.code_5)
                                }
                            })
                        }
                    })
                }
            })
        } else {
            return res.json(status.code_2)
        }
    })
    .get('/logout', (req, res) => {
        let { token } = req.headers,
            { cookieToken } = req.cookies;
        if (token === cookieToken) {
            res.clearCookie('cookieToken')
            return res.send({ code: 0, msg: '退出成功' })
        } else {
            return res.send(status.code_8)
        }
    })
    .post('/update', (req, res) => {
        let form = new formidable.IncomingForm(),
            file = {};
        console.log(form)
        form.parse(req, (err, fields, files) => {
            console.log(req)
            console.log(fields)
            console.log(files)
        })



        // form
        //     .on('error', (err) => {
        //         console.log(err); //各种错误
        //     })
        //     .on('file', (field, file) => { //上传文件
        //         console.log(file)
        //         file[field] = file;
        //     })
        //     .on('end', () => {
        //         console.log(file)
        //     })
        // form.parse(req, (err, fields) => {
        //     console.log(req)
        //     console.log(fields)
        // })
        // console.log(req)
        // let { type, url, filename } = req.body
        //     token = req.headers.token;
        //     jwt = new JwtUtil(token),
        //     id = jwt.decodeToken(),
        //     _baseUrl = __dirname,
        //     _idx = _baseUrl.indexOf('/service'),
        //     _startUrl = _baseUrl.substr(0, _idx),
        //     _outUrl = `${_startUrl}/${filename}/src/assets/images/avatar/${new Date().getTime()}.${type.split('/')[1]}`;
        // console.log(id)
        // console.log(url)


        // console.log(req.body)
        // let busboy = new Busboy({ headers: req.file });
        // busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        //     console.log(fieldname)
        // })
        return res.json({ code: 0, msg: 123456789 })
    })

module.exports = Router