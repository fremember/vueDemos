/*
 * @Author: fremember
 * @Date: 2021-06-28 11:01:46
 * @Description: 公共方法
 */

import store from '@/store'
import path from 'path'
import { isExternal } from '@/util/validate'

/**
 * 判断routes是不是含有url
 * @param {*} routes
 * @param {*} url 只做两种格式判断：/xx/xx 或者/xx
 * @return { Boolean }
 */
export function validAddress(routes, url) {
    let flag = false,
        _urlArr = url.split('/').filter(item => { return item }).map((item, index) => { return index == 0 ? `/${item}` : item });
    routes.forEach(route => {
        if (route.path == url) {
            !flag && (flag = true)
        } else {
            if (route.path == _urlArr[0] && _urlArr.length > 1) {
                if (route.children && route.children.length > 0) {
                    route.children.forEach(itm => {
                        if (itm.path == _urlArr[1])
                            !flag && (flag = true)
                    })
                }
            }
        }
    })
    return flag
}

/**
 * 过滤路由
 * @param Array routes 定义的所有路由
 * @param string baseUrl 路由的
 * @returns Array 可以跳转的路由
 */
export function filterRoutes (routes, baseUrl = '/') {
    return routes
        .filter(route => {// 这里可以增加权限筛选
            // if()
            return true
        })
        .map(route => {
            if (route.path !== '*' && !isExternal(route.path)) {
                route.fullPath = path.resolve(baseUrl, route.path)
            } else {
                route.fullPath = route.path
            }

            if (route.children)
                route.children = filterRoutes(route.children, route.path)
            return route
        })
}

// 格式化对象为get请求的字符串数据
export function formatQueryString(obj) {
    const _obj = obj
    let _res = ''
    if (obj) {
        const _aKeys = Object.keys(_obj),
            len = _aKeys.length;
        if (_aKeys.length > 0) {
            _res = '?'
            _aKeys.forEach((attr, index) => {
                _res = `${_res}${attr}=${_obj[attr]}${index < len - 1 ? '&' : ''}`
            })
        }
    }
    return _res
}


function doubleDate(date) {
    return date < 10 ? '0' + date : date
}

// 格式化时间
export function formatDate (type, date) {
    let _date = !date ? new Date() : new Date(date),
        o = {
            yyyy: _date.getFullYear(),
            MM: doubleDate(_date.getMonth() + 1), // 月份
            dd: doubleDate(_date.getDate()), // 日
            HH: doubleDate(_date.getHours()), // 小时
            mm: doubleDate(_date.getMinutes()), // 分
            ss: doubleDate(_date.getSeconds()) // 秒
        };
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(type)) {
            type = type.replace(RegExp.$1, o[k])
        }
    }
    return type
}
// 获取星期
export function getDay (date) {
    let _date = !date ? new Date() : new Date(date),
        _arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五',  '星期六'];
    return _arr[_date.getDay()]
}

/**
 * 时间段划分
 * 00-03(拂晓)、03-06(黎明)、06-09(清晨)、09-12(上午)、12-15(中午)、15-18(下午)、18-21(傍晚)、21-00(深夜/午夜)
 * 平台统一修改成 00-07(凌晨)、08-10(上午)、11-13(中午)、14-17(下午)、18-23(晚上)
 */
export function getTimestamp () {
    let _res = new Date().getHours(),
        _arr = ['凌晨', '凌晨', '凌晨', '凌晨', '凌晨', '凌晨', '凌晨', '凌晨', '上午', '上午', '上午', '中午', '中午', '中午', '下午', '下午', '下午', '下午', '晚上', '晚上', '晚上', '晚上', '晚上', '晚上'];
    return _arr[_res]
}