/*
 * @Author: fremember
 * @Date: 2021-09-26 09:19:02
 * @Description: 
 */
import { RouteRecordRaw } from 'vue-router'

import Layout from '@/views/layout/index.vue'

let commonRouter: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/forget',
        name: 'Forget',
        component: () => import('@/views/forget/index.vue')
    },
    {
        path: '/error',
        component: Layout,
        redirect: '/error/404',
        children: [
            {
                path: '404',
                name: 'NotFound',
                component: () => import('@/views/error/404/index.vue')
            },
            {
                path: '403',
                name: 'Forbid',
                component: () => import('@/views/error/403/index.vue')
            },
            {
                path: '502',
                name: 'Maintain',
                component: () => import('@/views/error/502/index.vue')
            }
        ]
    }
]

export default commonRouter