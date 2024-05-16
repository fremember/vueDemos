<template name="layout-view">
    <section class="flex flex-col layout">
        <main class="flex-1">
            <router-view />
        </main>
        <common-footer />
    </section>
</template>

<script setup lang="ts">
    import CommonFooter from '@/components/CommonFooter/index.vue'
</script>

<style scoped lang="scss" src="./index.scss">
</style>
