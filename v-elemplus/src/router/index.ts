import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home',
    },
   
    {
        path: '/layout',
        name: 'Layout',
        component: () => import('../components/Container/src/index.vue'),
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('../views/home/index.vue')
            },
            {
                path: '/chooseIcon',
                name: 'ChooseIcon',
                component: () => import('../views/chooseIcon/index.vue')
            },
            {
                path: '/chooseArea',
                name: 'ChooseArea',
                component: () => import('../views/chooseArea/index.vue')
            },
            {
                path: '/trend',
                name: 'Trend',
                component: () => import('../views/trend/index.vue')
            },
            {
                path: '/notification',
                name: 'Notification',
                component: () => import('../views/notification/index.vue')
            },
            {
                path: '/progress',
                name: 'Progress',
                component: () => import('../views/progress/index.vue')
            },
            {
                path: '/menu',
                name: 'Menu',
                component: () => import('../views/menu/index.vue')
            },
            {
                path: '/chooseTime',
                name: 'ChooseTime',
                component: () => import('../views/chooseTime/index.vue')
            },
            {
                path: '/chooseCity',
                name: 'ChooseCity',
                component: () => import('../views/chooseCity/index.vue')
            },
            {
                path: '/form',
                name: 'Form',
                component: () => import('../views/form/index.vue')
            },
            {
                path: '/modalForm',
                name: 'ModalForm',
                component: () => import('../views/modalForm/index.vue')
            },
            {

                path: '/calendar',
                name: 'Calendar',
                component: () => import('../views/calendar/index.vue')
            },
            {
                path: '/table',
                name: 'Table',
                component: () => import('../views/table/index.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory('/'),
    routes: routes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router