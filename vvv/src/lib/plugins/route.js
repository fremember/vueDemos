/*
 * @Author: fremember
 * @Date: 2021-06-16 11:28:16
 * @Description: 路由守卫
 */
import router from '@/router'
import store from '@/store'
import getPageTitle from '@/util/pageTitle'

router.beforeEach(async (to, from, next) => {// 在这里进行权限校验
    next()
})

router.afterEach((to) => {
    document.title = getPageTitle(to.meta.title)
})