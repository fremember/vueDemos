<template name="sub-menu">
    <el-sub-menu :index="menus.id" class="sub-menu">
        <template #title>
            <el-icon>
                <component :is="menus.icon" />
            </el-icon>
            <span>{{ menus.title }}</span>
        </template>
        <menu-item v-for="menu in menus.children" :key="menu.id" :menu="menu" />
    </el-sub-menu>
</template>

<script setup lang="ts">
    import MenuItem from './MenuItem.vue'

    defineProps(['menus'])
</script>

<style lang="scss" scoped src="./menu.scss"></style>