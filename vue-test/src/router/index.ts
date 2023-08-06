import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'LoginView',
        component: () => import('@/views/LoginView/index.vue'),
        meta: {
            title: 'Login'
        }
    },
    {
        path: '/home',
        name: 'HomeView',
        component: () => import('@/views/HomeView/index.vue'),
        meta: {
            title: 'Home'
        }
    }
];

const router = createRouter({
    history: createWebHashHistory('/'),
    routes: routes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router