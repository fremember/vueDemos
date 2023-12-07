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
		path: '/login/serviceAgree',
		name: 'ServiceAgree',
		component: () => import('@/views/login/serviceAgree.vue')
	},
	{
		path: '/login/privacyPolicy',
		name: 'PrivacyPolicy',
		component: () => import('@/views/login/privacyPolicy.vue')
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
	{
		path: '/task/details/:id',
		name: 'TaskDetails',
		component: () => import('@/views/task/details.vue')
	},
	{
		path: '/task/companySource/:id',
		name: 'CompanySource',
		component: () => import('@/views/task/companySource.vue')
	},
	{
		path: '/task/search',
		name: 'CompanySearch',
		component: () => import('@/views/task/search.vue')
	},
];

const router = createRouter({
    history: createWebHashHistory('/'),
    routes: routes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router;