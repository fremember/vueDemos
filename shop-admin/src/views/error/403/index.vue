<template name="not-found-view">
    <el-result
        icon="warning"
        title="404提示"
        sub-title="你找的页面走丢了~"
    >
        <template #extra>
            <el-button type="primary" @click="$router.push({ name: 'home-view' })">回到首页</el-button>
        </template>
    </el-result>
</template>

<script setup>
</script>

<style scoped></style>