/*
 * @Author: fremember
 * @Date: 2021-09-15 14:31:52
 * @Description: 前端路由入口
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import commonRouter from './modules/common'
import dashboardRouter from './modules/dashboard'

export const constantRoutes: Array<RouteRecordRaw> = [ ...commonRouter ]

export const asyncRoutes: Array<RouteRecordRaw> = [
    dashboardRouter
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [ ...constantRoutes, ...asyncRoutes]
})

export default router
