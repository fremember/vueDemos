<!--
 * @Author: fremember
 * @Date: 2021-09-27 08:30:53
 * @Description: 左侧导航栏
-->
<template name="component-name">
    <a-menu theme="dark" mode="inline" :default-selected-keys="selectedKeys" :selectedKeys="selectedKeys" :default-open-keys="openKeys" :openKeys="openKeys" v-if="routes.length > 0">
        <template v-for="route in routes">
            <template v-if="route.children.length <= 1">
                <a-menu-item :key="route.url">
                    <router-link :to="route.url">
                        <span>{{ route.title }}</span>
                    </router-link>
                </a-menu-item>
            </template>
            <template v-else>
                <lay-menu :menuInfo="route" :key="route.name" />
            </template>
        </template>
    </a-menu>
</template>
<script lang="ts">
    import { defineComponent, ref, computed, onMounted, watch } from 'vue'
    import { useRoute } from 'vue-router'
    import { useStore } from 'vuex'
    import {
        UserOutlined,
        VideoCameraOutlined,
        UploadOutlined
    } from '@ant-design/icons-vue'

    import LayMenu from './layMenu/index.vue'

   
    export default defineComponent({
        name: 'LayoutMenu',
        components: {
            UserOutlined,
            VideoCameraOutlined,
            UploadOutlined,
            LayMenu
        },
        setup() {
            let store = useStore(),
                route = useRoute(),
                selectedKeys = ref(['dashboard']),
                openKeys = ref(['/dashboard/index']),
                routes = computed(() => store.getters['routes/routes']),
                changeFromRoute = (path: string): void => {// 根据当前路由，修改selectedKeys、openKeys的值
                    let _routeArr = path.split('/').filter((val: string): string => val)
                    if(path === '/dashboard/index') {
                        openKeys.value = ['']
                    } else {
                        openKeys.value = [ `${_routeArr[0]}` ]
                    }
                    selectedKeys.value = [path]
                };
            onMounted(() => {
                changeFromRoute(route.path)
            })

            watch(
                () => route.path,
                (newVal: string): void => {
                    changeFromRoute(newVal)
                }
            )

            return {
                selectedKeys,
                openKeys,
                routes
            }
        }
    });
</script>
<style scoped lang="stylus"></style>