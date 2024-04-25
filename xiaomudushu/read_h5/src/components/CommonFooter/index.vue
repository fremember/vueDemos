<template name="common-footer">
    <ul class="flex flex-row align-middle py-1 common-footer">
        <li
            class="flex-1 text-center"
            :class="{active: activeRoute === menu.route}"
            v-for="menu in menuList"
            :key="menu.id"
            @click="changeRouter(menu.route)"
        >
            <i class="iconfont" :class="menu.icon"></i>
            <p>{{ menu.text }}</p>
        </li>
    </ul>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    const route = useRoute(),
        router = useRouter(),
        menuList = ref<Array<any>>([
            { id: '1', text: '书城', route: '/home', icon: 'icon-ziliaoku' },
            { id: '2', text: '社区', route: '/community', icon: 'icon-shequ-active' },
            { id: '3', text: '福利', route: '/welfare', icon: 'icon-fuli' },
            { id: '4', text: '我的', route: '/my', icon: 'icon-wodedamaijihuo' },
        ]),
        activeRoute = ref<string>('/home');
    
    const changeRouter = (path: string) => {
        router.push(path)
        activeRoute.value = path
    }

    onMounted(() => {
        activeRoute.value = route.path
    })
</script>

<style scoped lang="scss">
    .common-footer {
        border-top: 1px solid #eee;
        li {
            font-size: 12px;
            cursor: pointer;
            &.active {
                background: linear-gradient(to bottom, #ec4899 , #a855f7);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            a.active {
                background: transparent;
            }
        }
    }
</style>