<template class="">
    <section class="header">
        <span @click="toggle">
            <el-icon-expand v-show="props.collapse" />
            <el-icon-fold v-show="!props.collapse" />
        </span>
    </section>
</template>
    
<script lang='ts' setup>
    // const props = defineProps({
    //     isCollapse: {
    //         type: Boolean,
    //         default: false
    //     }
    // });
    const props = defineProps<{
        collapse: boolean
    }>();
    const emits = defineEmits([ 'update:collapse' ]);

    const toggle = () => {
        emits('update:collapse', !props.collapse);
    }
</script>
    
<style lang='scss' scoped>
    .header {
        display: flex;
        align-items: center;
        padding: 0 16px;
        height: 100%;
    }
</style>