/*
 * @Author: fremember
 * @Date: 2021-06-15 08:42:27
 * @Description: 路由
 */
import { createRouter, createWebHistory } from 'vue-router'

import commonRouter from './modules/common'
import userRouter from './modules/user'

export const constantRoutes = [ ...commonRouter ]

export const asyncRoutes = [
    userRouter
] 

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: constantRoutes
})

export default router
