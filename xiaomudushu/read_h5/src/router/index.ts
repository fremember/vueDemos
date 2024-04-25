import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes:Array<RouteRecordRaw> = [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/',
            name: 'layout-view',
            component: () => import('./../views/layout/index.vue'),
            children: [
                {
                    path: '/home',
                    name: 'home-view',
                    component: () => import('./../views/home/index.vue')
                },
                {
                    path: '/community',
                    name: 'community-view',
                    component: () => import('./../views/community/index.vue')
                },
                {
                    path: '/welfare',
                    name: 'welfare-view',
                    component: () => import('./../views/welfare/index.vue')
                },
                {
                    path: '/my',
                    name: 'my-view',
                    component: () => import('./../views/my/index.vue')
                },
            ]
        }
    ],
    router = createRouter({
        history: createWebHistory(),
        routes
    });
export default router;