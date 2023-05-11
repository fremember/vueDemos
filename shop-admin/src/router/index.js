import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [// 默认路由，所有用户共享
        {
            path: '/',
            name: 'layout-view',
            component: () => import('@/views/layout/index.vue')
        },
        {
            path: '/login',
            name: 'login-view',
            component: () => import('@/views/login/index.vue'),
            meta: {
                title: '登录'
            }
        },
        {
            path: '/:pathMatch(.*)',
            name: 'not-found-view',
            component: () => import('@/views/error/404/index.vue'),
            meta: {
                title: '404'
            }
        }
    ],
    asyncRoutes = [// 动态路由，用于匹配菜单动态添加路由
        {
            path: '/',
            name: 'home-view',
            component: () => import('@/views/home/index.vue'),
            meta: {
                title: '首页'
            }
        },
        {
            path: '/goods/list',
            name: 'goods-list',
            component: () => import('@/views/goods-manage/goods/list.vue'),
            meta: {
                title: '商品管理'
            }
        },
        {
            path: '/category/list',
            name: 'category-list',
            component: () => import('@/views/goods-manage/category/list.vue'),
            meta: {
                title: '分类管理'
            }
        },
        {
            path: '/skus/list',
            name: 'skus-list',
            component: () => import('@/views/goods-manage/skus/list.vue'),
            meta: {
                title: '规格管理'
            }
        },
        {
            path: '/coupon/list',
            name: 'coupon-list',
            component: () => import('@/views/goods-manage/coupon/list.vue'),
            meta: {
                title: '优惠券管理'
            }
        }
    ];

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export function addRoutes(menus) {// 动态添加路由的方法
    let hasNewRoutes = false
    const findAndAddRoutesByMenus = (arr) => {
        arr.forEach(e => {
            let item = asyncRoutes.find(o => o.path == e.frontpath)
            if(item && !router.hasRoute(item.path)) {
                router.addRoute('layout-view', item)
                hasNewRoutes = true
            }
            if(e.child && e.child.length > 0) {
                findAndAddRoutesByMenus(e.child)
            }
        })
    }

    findAndAddRoutesByMenus(menus)
    return hasNewRoutes
}