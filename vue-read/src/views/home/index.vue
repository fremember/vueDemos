<template name="home-view">
    <div class="home">
        <ul>
            <li v-for="item in 1000" :key="item">{{ item }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss" src="./index.scss"></style>