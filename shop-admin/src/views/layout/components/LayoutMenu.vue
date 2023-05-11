<template name="LayoutMenu">
    <div class="layout-menu" :style="{ width: $store.state.common.asideWidth }">
        <el-menu
            :default-active="defaultActive"
            unique-opened
            :collapse="isCollapse"
            default-active="2"
            class="border-0"
            @select="handleSelect"
            :collapse-transition="false"
        >
            <template v-for="(item, index) in asideMenus" :key="index">
                <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon" />
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath">
                        <el-icon>
                            <component :is="item2.icon" />
                        </el-icon>
                        <span>{{ item2.name }}</span>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="item.frontpath">
                    <el-icon>
                        <component :is="item.icon" />
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script setup>
    import { ref, computed } from 'vue'
    import { useStore } from 'vuex'
    import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'

    const store = useStore(),
        route = useRoute(),
        router = useRouter(),
        defaultActive = ref(route.path),// 默认选中
        isCollapse = computed(() => !(store.getters['common/asideWidth'] == '250px')),
        asideMenus = computed(() => store.getters['manager/menus']),
        handleSelect = (e) => {
            router.push(e)
        };
    onBeforeRouteUpdate((to, from) => {// 监听路有变化
        defaultActive.value = to.path
    })
</script>
<style>
    .layout-menu {
        transition: all 0.2s;
        top: 64px;
        bottom: 0;
        left: 0;
        overflow-y: auto;
        overflow-x: hidden;
        @apply shadow-md fixed bg-light-50;
    }
    .layout-menu::-webkit-scrollbar {
        width: 0px;
    }
</style>