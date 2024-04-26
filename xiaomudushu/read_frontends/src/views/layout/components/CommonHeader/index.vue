<template name="common-header">
    <el-icon @click="changeIsCollapse">
        <component :is="isCollapse ? 'Expand' : 'Fold'" />
    </el-icon>
    <el-dropdown>
        <div class="flex items-center justify0center header-avatar">
            <div class="avatar">
                <img src="@/assets/images/default_avatar.gif" />
            </div>
            <div class="name">fremember</div>
            <el-icon>
                <arrow-down />
            </el-icon>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { useCommonStore } from '@/store/common.store'

    const componentName = ref('Fold'),
        commonStore = useCommonStore(),
        isCollapse = computed(() => commonStore.isCollapse);

    const changeIsCollapse = () => {
        commonStore.changeIsCollapse()
    }
</script>

<style lang="scss" scoped>
    .header-avatar {
        height: 48px;
        outline: none;
        cursor: pointer;
        .avatar {
            position: relative;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;
            img {
                position: absolute;
                max-width: 60px;
                top: 0px;
                left: -13px;
            }
        }
        .name {
            margin: 0 6px;
        }
    }
</style>