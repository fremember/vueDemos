/*
 * @Author: fremember
 * @Date: 2021-06-24 17:32:19
 * @Description: 用户信息相关路由
 */
import Layout from '@/views/layout/index'
let userRouter = {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    meta: {
        title: '用户',
        cache: true,
        roles: ['admin', 'editer']
    },
    children: [
        {
            path: 'index',
            name: 'User',
            component: () => import('@/views/home/index'),
            meta: {
                title: '用户列表',
                type: 1,
                cache: true,
                roles: ['admin', 'editer']
            }
        }
    ]
}

export default userRouter