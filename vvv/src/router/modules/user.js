/*
 * @Author: fremember
 * @Date: 2021-06-28 09:13:45
 * @Description: 用户相关路由
 */
import Layout from '@/views/layout/index'

let userRouter = {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    meta: {
        title: '用户',
        cache: true,
        icon: 'UserOutlined'
    },
    children: [
        {
            path: 'list',
            name: 'UserList',
            component: () => import('@/views/user/list/index'),
            meta: {
                title: '用户列表',
                cache: true,
                icon: 'MenuOutlined'
            }
        },
        {
            path: 'info',
            name: 'UserInfo',
            component: () => import('@/views/user/info/index'),
            meta: {
                title: '用户信息',
                cache: true,
                icon: 'FileTextOutlined'
            }
        }
    ]
}

export default userRouter