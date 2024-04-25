<template name="layout-view">
    <section class="flex flex-col layout">
        <common-header />
        <main class="flex-1">
            <router-view />
        </main>
        <common-footer />
    </section>
</template>

<script setup lang="ts">
    import CommonHeader from '@/components/CommonHeader/index.vue'
    import CommonFooter from '@/components/CommonFooter/index.vue'
</script>

<style scoped lang="scss" src="./index.scss">
</style>
