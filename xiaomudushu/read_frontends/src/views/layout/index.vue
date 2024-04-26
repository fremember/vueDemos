<template name="layout-view">
    <el-container class="layout">
        <el-aside class="layout-aside" :class="{'narrow-edge': isCollapse}">
            <div class="text-center layout-aside-logo">读书管理端</div>
            <aside-menu />
        </el-aside>
        <el-container class="layout-container">
            <el-header class="flex items-center justify-between layout-container-header">
                <common-header />
            </el-header>
            <el-main class="layout-container-main">
                <div class="scroll-menu">hshs</div>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import { useCommonStore } from '@/store/common.store'

    import AsideMenu from './components/AsideMenu/index.vue'
    import CommonHeader from './components/CommonHeader/index.vue'

    const commonStore = useCommonStore(),
        isCollapse = computed(() => commonStore.isCollapse);
</script>

<style lang="scss" scoped>
    .layout {
        width: 100vw;
        height: 100vh;
        &-aside {
            width: 180px;
            height: 100%;
            overflow-y: auto;
            background: #304156;
            box-shadow: 2px 0 6px rgba(0,21,41,.35);
            transition: all .3s ease-in-out;
            &-logo {
                height: 48px;
                line-height: 48px;
                color: #fff;
                font-weight: 500;
            }
            &.narrow-edge {
                width: 64px;
            }
        }
        &-container {
            &-header {
                height: 48px;
                border-bottom: 1px solid #dcdfe6;
            }
            &-main {

            }
        }
    }
</style>
