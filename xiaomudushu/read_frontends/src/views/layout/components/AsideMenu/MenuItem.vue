<template name="menu-item">
    <el-menu-item :index="menu.id" class="menu-item">
        <el-icon>
            <component :is="menu.icon" />
        </el-icon>
        <template #title>{{ menu.title }}</template>
    </el-menu-item>
</template>

<script setup lang="ts">
    defineProps(['menu'])
</script>

<style lang="scss" scoped src="./menu.scss"></style>