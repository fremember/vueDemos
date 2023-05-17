<template name="image-list">
    <el-container class="bg-white rounded" :style="{ height: `${h}px` }">
        <el-header class="image-header">
            <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
            <el-button type="warning" size="small" @click="handleOpenUpdate">上传图片</el-button>
        </el-header>
        <el-container>
            <image-aside ref="ImageAsideRef" @change="handleAsideChange" />
            <image-main ref="ImageMainRef" />
        </el-container>
    </el-container>
</template>
<script setup>
    import { ref } from 'vue'
    
    import ImageAside from '@/components/ImageAside.vue'
    import ImageMain from '@/components/ImageMain.vue'

    const windowHeight = window.innerHeight || document.body.clientHeight,
        h = windowHeight - 64 - 44 - 40,
        ImageAsideRef = ref(null),
        ImageMainRef = ref(null),
        handleOpenCreate = () => ImageAsideRef.value.handleCreate(),
        handleOpenUpdate = () => ImageMainRef.value.openUploadFile(),
        handleAsideChange = (image_class_id) => ImageMainRef.value.loadData(image_class_id);
</script>
<style>
    .image-header {
        border-bottom: 1px solid #eeeeee;
        @apply flex items-center;
    }
</style>