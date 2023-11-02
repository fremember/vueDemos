<script setup lang="ts">
    import FooterTabbar from '@/components/FooterTabbar.vue'
</script>

<template>
    <section class="container">
        <section class="main">
            <router-view />
        </section>
        <FooterTabbar />
    </section>
</template>

<style scoped>
    .container {
        width: 100vw;
        height: 100vh;
    }
    .main {
        width: 100vw;
        height: calc(100vh - 3rem);
    }
</style>
