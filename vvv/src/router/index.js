/*
 * @Author: fremember
 * @Date: 2021-06-28 09:12:36
 * @Description: 路由配置主文件
 */
import { createRouter, createWebHistory } from 'vue-router'
import { filterRoutes } from '@/util/common'

import commonRouter from './modules/commonRouter'
// import skillsRouter from './modules/skills'
import userRouter from './modules/user'
import statisticalRouter from './modules/statisticalRouter'
import errorRouter from './modules/errorRouter'
export const asyncRouter = filterRoutes([
    // skillsRouter,
    userRouter,
    statisticalRouter,
    errorRouter
], '/')
export const constantRoutes = [
    ...commonRouter,
    ...asyncRouter
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: constantRoutes
})

export default router