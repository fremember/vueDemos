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
            path: '/user/list',
            name: 'user-list',
            component: () => import('@/views/user-manage/user/list.vue'),
            meta: {
                title: '用户管理'
            }
        },
        {
            path: '/level/list',
            name: 'level-list',
            component: () => import('@/views/user-manage/level/list.vue'),
            meta: {
                title: '会员等级'
            }
        },
        {
            path: '/coupon/list',
            name: 'coupon-list',
            component: () => import('@/views/goods-manage/coupon/list.vue'),
            meta: {
                title: '优惠券管理'
            }
        },
        {
            path: '/manager/list',
            name: 'manager-list',
            component: () => import('@/views/admin-manage/manager/list.vue'),
            meta: {
                title: '管理员管理'
            }
        },
        {
            path: '/access/list',
            name: 'access-list',
            component: () => import('@/views/admin-manage/access/list.vue'),
            meta: {
                title: '权限管理'
            }
        },
        {
            path: '/role/list',
            name: 'role-list',
            component: () => import('@/views/admin-manage/role/list.vue'),
            meta: {
                title: '角色管理'
            }
        },
        {
            path: '/image/list',
            name: 'image-list',
            component: () => import('@/views/other-module/image/list.vue'),
            meta: {
                title: '图库管理'
            }
        },
        {
            path: '/notice/list',
            name: 'notice-list',
            component: () => import('@/views/other-module/notice/list.vue'),
            meta: {
                title: '公告管理'
            }
        },
        {
            path: '/distribution/index',
            name: 'distribution-index',
            component: () => import('@/views/distribution-module/distributors/index.vue'),
            meta: {
                title: '分销员管理'
            }
        },
        {
            path: '/distribution/setting',
            name: 'distribution-setting',
            component: () => import('@/views/distribution-module/setting/index.vue'),
            meta: {
                title: '分销管理'
            }
        },
        {
            path: '/order/list',
            name: 'order-list',
            component: () => import('@/views/order-manage/list/index.vue'),
            meta: {
                title: '订单管理'
            }
        },
        {
            path: '/comment/list',
            name: 'order-comment',
            component: () => import('@/views/order-manage/comment/index.vue'),
            meta: {
                title: '评论管理'
            }
        },
        {
            path: '/setting/base',
            name: 'setting-base',
            component: () => import('@/views/system-setting/base/index.vue'),
            meta: {
                title: '基础设置'
            }
        },
        {
            path: '/setting/buy',
            name: 'setting-buy',
            component: () => import('@/views/system-setting/buy/index.vue'),
            meta: {
                title: '交易设置'
            }
        },
        {
            path: '/setting/ship',
            name: 'setting-ship',
            component: () => import('@/views/system-setting/ship/index.vue'),
            meta: {
                title: '物流设置'
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