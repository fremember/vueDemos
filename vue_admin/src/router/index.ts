/*
 * @Author: fremember
 * @Date: 2021-04-22 14:31:38
 * @Description: 
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
            cache: false
        }
    },
    {
        path: '/layout',
        name: 'Layout',
        component: () => import('@/views/layout/index.vue'),
        meta: {
            title: '布局',
            cache: false
        },
        children: [
            {
                path: '/index',
                name: 'Index',
                component: () => import('@/views/index/index.vue'),
                meta: {
                    title: '首页',
                    cache: true
                }
            }
        ]
    },
    
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
