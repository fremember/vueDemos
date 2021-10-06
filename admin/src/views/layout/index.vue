<!--
 * @Author: fremember
 * @Date: 2021-09-15 17:12:41
 * @Description: 布局页面
-->
<template>
    <a-layout class="pxy-layout">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <div class="colorfff flex-center pxy-layout-logo">admin</div>
            <layout-menu />
        </a-layout-sider> 
        <a-layout>
            <a-layout-header class="pay-layout-header">
                <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)"/>
                <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
            </a-layout-header>
            <a-layout-content class="pxy-layout-content">
                <router-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script lang="ts">
    import { defineComponent, ref } from 'vue'
    import LayoutMenu from './layoutMenu/index.vue'

    import {
        MenuUnfoldOutlined,
        MenuFoldOutlined
    } from '@ant-design/icons-vue'

    export default defineComponent({
        name: 'Layout',
        components: {
            LayoutMenu,
            MenuUnfoldOutlined,
            MenuFoldOutlined
        },
        setup() {
            return {
                collapsed: ref<boolean>(false),
            }
        }
    });
</script>
<style scoped lang="stylus">
    @import './../../assets/stylus/reset'
    .pxy-layout {
        height(100vh)
        &-logo {
            height(50px)
        }
    }
</style>