/*
 * @Author: fremember
 * @Date: 2021-09-26 09:19:15
 * @Description: 
 */
import { RouteRecordRaw } from 'vue-router'

import Layout from '@/views/layout/index.vue'

let dashboardRouter: RouteRecordRaw = {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    meta: {
        title: '首页',
        noCache: true,
        icon: 'home',
        roles: ['admin']
    },
    children: [
        {
            path: 'index',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index.vue'),
            meta: {
                title: '首页',
                icon: 'home',
                type: 1,
                noCache: true,
                roles: ['admin']
            }
        }
    ]
}

export default dashboardRouter