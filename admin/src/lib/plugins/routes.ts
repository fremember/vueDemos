/*
 * @Author: fremember
 * @Date: 2021-09-28 08:19:28
 * @Description: 路由守卫
 */
import router from '@/router'
import store from '@/store'
import { getPageTitle } from '@/utils/tool'

import Storage from '@/utils/storage'
import config from '@/config'

const storage = new Storage(),
    { 
        setting: {
            routeWhiteList
        } 
    } = config;
function changeFlag (path: string, routes: Array<any>): boolean {// 判断需要跳转的路由是不是存在route store里面，具体判断方法
    let flag: boolean =  false
    routes.forEach((item: any): void => {
        if(!flag) {
            if (item.url === path) {
                flag = true
            } else {
                if (item.children && item.children.length > 0) {
                    flag = changeFlag(path, item.children)
                }
            }
        }
    })
    return flag
}
function getRoutesFromStore (path: string, next: any, routes?: Array<any>): void {// 判断需要跳转的路由是不是存在route store里面
    if (routes && routes.length > 0) {
        if (changeFlag(path, routes)) {
            next()
        } else {
            next({ path: '/error/404', replace: true })
        }
    } else {
        next({ path: '/login', query: { redirect: path }, replace: true })
    }
}
router.beforeEach(async (to: any, from: any, next: any) => {
    const _token: string = storage.getStorage('token', 1) || '',
        _rolename: string = storage.getStorage('rolename', 1) || '';
    if (routeWhiteList.includes(to.path)) {// 判断需要去的路由是不是白名单中的路由，如果是，直接跳转
        let routes: Array<string> = store.getters['routes/routes'] || []
        if (routes.length === 0 && (from.path !== '/' && from.path !== '/login')) {
            routes = await store.dispatch('routes/setRoutes', { rolename: _rolename })
        }
        next()
    } else {//如果不是
        if(!_token) {// 不存在token的时候，跳转到登录页
            if (to.query.redirect) {
                next()
            } else {
                if (to.path === '/login' || to.path === '/' || routeWhiteList.includes(to.path)) {
                    next({ path: '/login', replace: true })
                } else {
                    next({ path: '/login', query: { redirect: to.path }, replace: true })
                }
            }
        } else {
            // 如果存在token，
            // 首先判断routes store是否为空，
            //     不为空时，判断需要跳转的路由在不在routes store里面存储，如果不存在，跳转到404页面，如果存在直接跳转
            //     为空时，请求接口获取登录用户的前端路由，重复上一步
            let routes: Array<string> = store.getters['routes/routes'] || []
            if(routes.length > 0) {
                getRoutesFromStore(to.path, next, routes)
            } else {
                routes = await store.dispatch('routes/setRoutes', { rolename: _rolename })
                getRoutesFromStore(to.path, next, routes)
            }
        }
    }
})

router.afterEach((to: any) => {
    document.title = getPageTitle(to.meta.title)
    if (routeWhiteList.includes(to.fullPath) && to.fullPath.indexOf('/error') < 0) {
        storage.clearStorage(1)
        storage.clearStorage(2)
    }
})