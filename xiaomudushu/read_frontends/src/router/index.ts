import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login-view',
        component: () => import('./../views/login/index.vue')
    },
    {
        path: '/layout',
        name: 'layout-view',
        redirect:'/layout/home',
        component: () => import('./../views/layout/index.vue'),
        children: [
            {
                path: 'home',
                name: 'home-view',
                component: () => import('./../views/home/index.vue')
            },
            {
                path: 'menu',
                name: 'menu-view',
                component: () => import('./../views/authorityManage/menu/index.vue')
            },
            {
                path: 'role',
                name: 'role-view',
                component: () => import('./../views/authorityManage/role/index.vue')
            },
            {
                path: 'user',
                name: 'user-view',
                component: () => import('./../views/authorityManage/user/index.vue')
            },


            {
                path: 'loginLog',
                name: 'loginLog-view',
                component: () => import('./../views/logManage/login/index.vue')
            },
            {
                path: 'operateLog',
                name: 'operateLog-view',
                component: () => import('./../views/logManage/operate/index.vue')
            }
        ]
    }
],
router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;