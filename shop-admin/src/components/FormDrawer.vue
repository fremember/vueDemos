<template>
    <el-drawer
        v-model="showDrawer" 
        :title="title" 
        :size="size" 
        :close-on-click-modal="false"
        :destroy-on-close="destroyOnClose"
    >
        <div class="form-drawer">
            <div class="body">
                <slot></slot>
            </div>
            <div class="actions">
                <el-button type="primary" @click="submit" :loading="loading">{{ confirmText }}</el-button>
                <el-button type="default" @click="close">取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>
<script setup>
    import { ref } from "vue"

    const showDrawer = ref(false),
        props = defineProps({
            title: String,
            size: {
                type: String,
                default: '45%'
            },
            destroyOnClose: {
                type: Boolean,
                default: false
            },
            confirmText: {
                type: String,
                default: '提交'
            }
        }),
        loading = ref(false),
        showLoading = () => loading.value = true,
        hideLoading = () => loading.value = false,
        open = () => showDrawer.value = true,// 打开
        close = () => showDrawer.value = false,// 关闭
        emit = defineEmits(['submit']),// 定义父级的submit事件
        submit = () => emit('submit');// 触发父级的submit事件
    // 向父组件暴露以下方法
    defineExpose({
        open,
        close,
        showLoading,
        hideLoading
    })
</script>
<style scoped>
    .form-drawer {
        width: 100%;
        height: 100%;
        position: relative;
        @apply flex flex-col;
    }
    .form-drawer .body {
        flex: 1;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        overflow-y: auto;
    }
    .form-drawer .actions{
        height: 50px;
        @apply mt-auto flex items-center;
    }
</style>