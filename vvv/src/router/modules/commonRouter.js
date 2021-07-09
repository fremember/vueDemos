/*
 * @Author: fremember
 * @Date: 2021-06-28 09:13:14
 * @Description: 公共路由
 */
import Layout from '@/views/layout/index'
let commonRouter = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            cache: false,
            title: '登录'
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/register/index.vue'),
        meta: {
            cache: false,
            title: '注册'
        }
    },
    {
        path: '/forget',
        name: 'Forget',
        component: () => import('@/views/forget/index.vue'),
        meta: {
            cache: false,
            title: '忘记密码'
        }
    },
    {
        path: '/modify',
        name: 'Modify',
        component: () => import('@/views/forget/index.vue'),
        meta: {
            cache: false,
            title: '修改密码'
        }
    },
    {
        path: '/dashboard',
        component: Layout,
        redirect: '/dashboard/index',
        meta: {
            title: '首页',
            cache: true
        },
        children: [
            {
                path: 'index',
                name: 'Dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                meta: {
                    title: '首页',
                    cache: true
                }
            }
        ]
    },
    {// 错误路由重定向到登录页面
        path: '/:pathMatch(.*)*',
        redirect: '/login'
    }
]

export default commonRouter



