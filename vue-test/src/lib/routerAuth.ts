import router from '@/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

nProgress.configure({
    showSpinner: false
})

// 全局前置守卫，需要继续封装动态路由添加的逻辑
router.beforeEach(() => {
    nProgress.start()
    return true
})

// 全局后置守卫
router.afterEach(() => {
    nProgress.done(true)
})