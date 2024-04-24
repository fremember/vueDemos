import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes:Array<RouteRecordRaw> = [
        {
            path: '/',
            redirect: '/layout/home'
        },
        {
            path: '/layout',
            name: 'layout-view',
            component: () => import('./../views/layout/index.vue'),
            children: [
                {
                    path: '/home',
                    name: 'home-view',
                    component: () => import('./../views/home/index.vue')
                },
            ]
        }
    ],
    router = createRouter({
        history: createWebHistory(),
        routes
    });
export default router;