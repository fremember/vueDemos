import store from '@/store'
import { router, addRoutes } from '@/router'
import cookie from './cookie'
import { notification } from './element-plus'
import { showFullLoading, hideFullLoading } from './lib'

// 全局前置守卫
let hasGetInfo = false
router.beforeEach(async (to, from, next) => {
    showFullLoading()// 现实loading

    const token = cookie.get('token')
    if(!token && to.path != '/login') {// 没有登录强制跳转回登录页面
        notification({ message: '请先登录', type: 'warning' })
        return next({ path: '/login' })
    }
    // 防止重复登录
    if(token && to.path == '/login') {
        notification({ message: '请勿重复登录', type: 'warning' })
        return next({ path: from.path ? from.path : '/' })
    }
    // 如果用户登录了，自动获取用户信息，并存储在vuex中
    let hasNewRoutes = false
    if (token && !hasGetInfo) {
        let { menus } = await store.dispatch('manager/getInfo')
        hasGetInfo = true
        // 动态添加路由
        hasNewRoutes = addRoutes(menus)
    }
    hasNewRoutes ? next(to.fullPath) : next()
})

// 全局后置守卫
router.afterEach((to, from) => {
    hideFullLoading()
    document.title = `${to.meta.title} - 商城`
})