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
    children: [
        {
            path: 'index',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index.vue'),
            meta: {
                // icon: 'HomeOutlined',
                catch: false
            }
        }
    ]
}

export default dashboardRouter