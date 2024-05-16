<template name="home-view">
    <div class="flex flex-col home">
        <home-search />
        <nav class="home-nav">
            <div>qwe</div>
        </nav>
        <section class="flex-1 home-body">
            <div v-for="item in 100" :key="item">{{ item }}</div>
        </section>
    </div>
</template>

<script setup lang="ts">
    import HomeSearch from './components/HomeSearch/index.vue'
</script>

<style scoped lang="scss" src="./index.scss"></style>