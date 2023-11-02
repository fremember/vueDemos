<script lang="ts" setup>
	import { reactive, computed } from 'vue'
	import { useRouter, useRoute } from 'vue-router'
	import { userStore } from '@/store/user'

	const store = userStore(),
		router = useRouter(),
		route = useRoute();
	const routesAll = reactive<any[]>([
			{
				id: 1,
				className: 'icon-task-bar',
				path: '/task',
				role: ['1'],
				text: '任务'
			},
			{
				id: 2,
				className: 'icon-task-bar',
				path: '/admin/home',
				role: ['2'],
				text: '首页'
			},
			{
				id: 3,
				className: 'icon-talent-bar',
				path: '/talent',
				role: ['3'],
				text: 'IT人才'
			},
			{
				id: 4,
				className: 'icon-contract-bar',
				path: '/contract',
				role: ['2'],
				text: '合约'
			},
			{
				id: 5,
				className: 'icon-message-bar',
				path: '/message',
				role: ['2'],
				text: '消息'
			},
			{
				id: 6,
				className: 'icon-my-bar',
				path: '/my',
				role: ['1', '2', '3'],
				text: '我的'
			}
		]),
		routes = computed(() => {
			console.log(store.role)
			return routesAll.filter((item) => item.role.includes(store.role))
		});
	const gotoPage = (path: string) => {
		router.push(path)
	};
</script>

<template>
	<dl>
		<dt
			:class="[item.className, item.path == route.path ? 'active' : '']"
			v-for="item in routes"
			:key="item.id"
			@click="gotoPage(item.path)"
		>
			<i></i>
			<p>{{ item.text }}</p>
		</dt>
	</dl>
</template>

<style type="text/css" scoped>
	dl {
		display: flex;
		width: 100%;
		height: 3rem;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
		border-top: 1px solid #ddd;
		background: #fff;
	}
	dl dt {
		flex: 1;
		padding: 0.69rem 0;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		font-size: 0.59rem;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666;
	}
	dl dt i {
		width: 0.91rem;
		height: 0.91rem;
		display: block;
    	margin: 0 auto;
	}
	.icon-task-bar i {
	    background: url('@/assets/img/icon/bar-task-link.png') no-repeat;
	    background-size: 100%;
	}
	.icon-task-bar.active i {
	    background: url('@/assets/img/icon/bar-task-active.png') no-repeat;
	    background-size: 100%;
	}
	.icon-talent-bar i {
	    background: url('@/assets/img/icon/bar-talent-link.png') no-repeat;
	    background-size: 100%;
	}
	.icon-talent-bar.active i {
	    background: url('@/assets/img/icon/bar-talent-active.png') no-repeat;
	    background-size: 100%;
	}
	.icon-contract-bar i {
	    background: url('@/assets/img/icon/bar-contract-link.png') no-repeat;
	    background-size: 100%;
	}
	.icon-contract-bar.active i {
	    background: url('@/assets/img/icon/bar-contract-active.png') no-repeat;
	    background-size: 100%;
	}
	.icon-message-bar i {
	    background: url('@/assets/img/icon/bar-message-link.png') no-repeat;
	    background-size: 100%;
	}
	.icon-message-bar.active i {
	    background: url('@/assets/img/icon/bar-message-active.png') no-repeat;
	    background-size: 100%;
	}
	.icon-my-bar i {
	    background: url('@/assets/img/icon/bar-my-link.png') no-repeat;
	    background-size: 100%;
	}
	.icon-my-bar.active i {
	    background: url('@/assets/img/icon/bar-my-active.png') no-repeat;
	    background-size: 100%;
	}
	dl dt.active p {
	    color: #ff9415;
	}
</style>