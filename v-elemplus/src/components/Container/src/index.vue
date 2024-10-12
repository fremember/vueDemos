<template>
    <el-container>
        <nav-side :collapse="collapse" />
        <el-container>
            <el-header>
                <nav-header v-model:collapse="collapse" />
            </el-header>

            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>
    
<script lang='ts' setup>
    import { ref } from 'vue';

    import NavHeader from './navHeader/index.vue';
    import NavSide from './navSide/index.vue';
    const collapse = ref(false);
</script>
    
<style lang='scss' scoped>
    .el-header {
        padding: 0;
        border-bottom: 1px solid #eee;
    }
</style>
    