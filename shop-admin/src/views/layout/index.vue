<template name="layout-view">
    <el-container>
        <el-header>
            <layout-header />
        </el-header>
        <el-container>
            <el-aside :width="$store.state.common.asideWidth">
                <layout-menu />
            </el-aside>
            <el-main>
                <layout-tag-list />
                <router-view v-slot="{ Component }">
                    <transition name="fade">
                        <keep-alive :max="10">
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script setup>
    import LayoutHeader from './components/LayoutHeader.vue'
    import LayoutMenu from './components/LayoutMenu.vue'
    import LayoutTagList from './components/LayoutTagList.vue'
</script>
<style scoped>
    .el-aside{
        transition: all 0.2s;
    }
    .fade-enter-from{
        opacity: 0;
    }
    .fade-enter-to{
        opacity: 1;
    }
    .fade-leave-from{
        opacity: 1;
    }
    .fade-leave-to{
        opacity: 0;
    }
    .fade-enter-active,
    .fade-leave-active{
        transition: all 0.3s;
    }
    .fade-enter-active{
        transition-delay: 0.3s;
    }
</style>