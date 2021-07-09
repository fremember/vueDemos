/*
 * @Author: fremember
 * @Date: 2021-06-28 19:55:47
 * @Description: error
 */
import Layout from '@/views/layout/index'
let errorRouter = {
    path: '/error',
    component: Layout,
    redirect: '/error/403',
    meta: {
        title: '错误',
        icon: 'CloseOutlined'
    },
    children: [
        {
            path: '403',
            name: 'Forbiden',
            component: () => import('@/views/error/403/index.vue'),
            meta: {
                title: '403',
                icon: 'WarningOutlined'
            }
        },
        {
            path: '404',
            name: 'NotFound',
            component: () => import('@/views/error/404/index.vue'),
            meta: {
                title: '404',
                icon: 'CloseCircleOutlined'
            }
        },
        {
            path: '502',
            name: 'Maintain',
            component: () => import('@/views/error/502/index.vue'),
            meta: {
                title: '502',
                icon: 'BugOutlined'
            }
        }
    ]
}

export default errorRouter