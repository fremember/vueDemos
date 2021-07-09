<!--
 * @Author: fremember
 * @Date: 2021-06-23 17:18:46
 * @Description: 左侧路由
-->
<template>
    <section class="sider">
        <div class="tac colorfff logo">
            <router-link class="colorfff" to="/dashboard/index">fremember</router-link>
        </div>
        <a-menu mode="inline" theme="dark" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys">
            <a-sub-menu v-for="route in routes" :key="route.fullPath">
                <template #title>
                    <span>
                        <mine-icon :componentName="route.meta.icon" />
                        <span>{{ route.meta.title }}</span>
                    </span>
                </template>
                <a-menu-item v-for="item in route.children" :key="item.fullPath">
                    <router-link :to="item.fullPath">
                        <mine-icon :componentName="item.meta.icon" />
                        {{ item.meta.title }}
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
    </section>
</template>
<script type="text/ecmascript-6">
    import { ref, watch, getCurrentInstance } from 'vue'
    import { asyncRouter } from '@/router'
    import MineIcon from '@/components/mineIcon/index.vue'
    export default {
        name: 'Sider',
        components: { MineIcon },
        setup () {
            let { proxy } = getCurrentInstance(),
                openKeys = ref([]),
                selectedKeys = ref([]),
                routes = ref(asyncRouter),
                handleOpen = (nRoute, oRoute) => {
                    const _nRoute = nRoute,
                        _oRoute = oRoute;
                    if(!_oRoute || (_oRoute && _nRoute.fullPath != _oRoute.fullPath)) {
                        openKeys.value = []
                        selectedKeys.value = []
                        asyncRouter.forEach(route => {
                            if(nRoute.fullPath.indexOf(route.fullPath) >= 0) {
                                openKeys.value = [route.fullPath]
                                if(route.children && route.children.length > 0) {
                                    route.children.forEach(item => {
                                        if(item.fullPath == nRoute.fullPath) {
                                            selectedKeys.value = [item.fullPath]
                                        }
                                    })
                                }
                            }
                        })
                    }
                };
            watch(() => proxy.$router.currentRoute.value, (nRoute, oRoute) => {
                handleOpen(nRoute, oRoute)
            }, {
                immediate: true// 立即监听路由变化
            })
            return {
                openKeys,
                selectedKeys,
                routes
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../assets/stylus/reset'
    .sider {
        height(100vh)
        overflow-y: auto
        .logo {
            height(50px)
            line-height(50px)
        }
    }
</style>