/*
 * @Author: fremember
 * @Date: 2021-06-16 11:28:16
 * @Description: 路由守卫
 */
import router from '@/router'
import store from '@/store'
import getPageTitle from '@/util/pageTitle'
import commonSettings from '@/config'
import { validAddress } from '@/util/routes'

router.beforeEach(async (to, from, next) => {
    let { loginInterception, routesWhiteList, recordRoute } = commonSettings,
        hasToken = store.getters['user/accessToken'],
        rolename = store.getters['user/rolename'];
    if (routesWhiteList.includes(to.path)) {
        next()
    } else {
        if (!loginInterception) hasToken = true
        if (hasToken) {
            let hasRole = to.meta.roles && to.meta.roles.includes(rolename),
                accessRoutes = store.getters['router/routes'];
            accessRoutes.forEach(item => {
                router.addRoute(item)
            })
            if(hasRole) {
                next()
            } else {
                // 路由重定向，如果合法的地址，可以正常走流程，不是合法的地址，重定向到404页面
                if (validAddress(accessRoutes, to.path)) {
                    next({ ...to, replace: true })
                } else {
                    next({ path: '/404', replace: true })
                }
            }
        } else {
            if (recordRoute) // token失效回退到登录页时是否记录本次的路由
                next({ path: '/login', query: { redirect: to.path }, replace: true })
            else next({ path: '/login', replace: true })
        }
    }
})

router.afterEach((to) => {
    document.title = getPageTitle(to.meta.title)
})