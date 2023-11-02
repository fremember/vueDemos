import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login/index.vue')
	},
	{
		path: '/layout',
		name: 'Layout',
		component: () => import('@/views/layout/index.vue'),
		children: [
			{
				path: '/task',
				name: 'Task',
				component: () => import('@/views/task/index.vue')
			},
			{
				path: '/my',
				name: 'My',
				component: () => import('@/views/my/index.vue')
			}
		]
	},
];

const router = createRouter({
    history: createWebHashHistory('/'),
    routes: routes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router;