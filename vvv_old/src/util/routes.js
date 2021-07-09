/*
 * @Author: fremember
 * @Date: 2021-06-16 16:25:00
 * @Description: 路由相关
 */

import commonSettings from '@/config'
import store from '@/store'
import { isExternal } from '@/util/validate'
import path from 'path'

/**
 * 判断routes是不是含有url
 * @param {*} routes
 * @param {*} url 只做两种格式判断：/xx/xx 或者/xx
 * @return { Boolean }
 */
export function validAddress (routes, url) {
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
 * 判断登录用户的角色有没有在角色列表
 * @param Array role 路由下的角色数组
 * return boolean 存在 true，不存在 false
 */
function hasRole (roleArr) {
    let _role = store.getters['user/rolename']
    return roleArr.includes(_role)
}
/**
 * 过滤路由
 * @param Array routes 定义的所有路由
 * @param string baseUrl 路由的
 * @returns Array 可以跳转的路由
 */
export function filterRoutes (routes, baseUrl = '/') {
    let { rolesControl } = commonSettings
    return routes
        .filter((route) => {
            if (route.meta && route.meta.roles)
                return !rolesControl || hasRole(route.meta.roles)
            else
                return true
        })
        .map(route => {
            if (route.path !== '*' && !isExternal(route.path))
                route.fullPath = path.resolve(baseUrl, route.path)
            route.fullPath = route.path

            if (route.children)
                route.children = filterRoutes(route.children, route.fullPath)
            return route
        })
}