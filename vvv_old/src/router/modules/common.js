/*
 * @Author: fremember
 * @Date: 2021-06-24 16:35:34
 * @Description: 公共路由
 */
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
        path: '/404',
        name: 'NotFound',
        component: () => import('@/views/404/index.vue'),
        meta: {
            cache: false,
            title: '404'
        }
    },
    {
        path: '/403',
        name: 'Forbid',
        component: () => import('@/views/403/index.vue'),
        meta: {
            cache: false,
            title: '403'
        }
    },
    {
        path: '/502',
        name: 'Maintain',
        component: () => import('@/views/502/index.vue'),
        meta: {
            cache: false,
            title: '502'
        }
    }
]

export default commonRouter