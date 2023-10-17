<template>
    <div :class="{ 'choose-icon-dialog-body-height': isScroll }">
        <el-dialog v-model="dialogVisible" v-bind="$attrs">
            <template #default>
                <f-form
                    ref="form"
                    :options="options"
                    label-width="100px"
                    @on-change="onChange"
                    @before-upload="beforeUpload"
                    @on-preview="onPreview"
                    @on-remove="onRemove"
                    @before-remove="beforeRemove"
                    @on-success="onSuccess"
                    @on-exceed="onExceed"
                >
                    <template #uploadArea>
                        <slot name="uploadArea"></slot>
                    </template>
                    <template #uploadTip>
                        <slot name="uploadTip"></slot>
                    </template>
                </f-form>
            </template>
            <template #footer>
                <slot name="footer" :form="form"></slot>
            </template>
        </el-dialog>
    </div>
</template>
    
<script lang='ts' setup>
    import { PropType, ref, watch } from 'vue'
    import { FormOptions } from './../../form/src/types/types'

    const props = defineProps({
            // 是否只在可视区域内滚动
            isScroll: {
                type: Boolean,
                default: false
            },
            visible: {
                type: Boolean,
                default: false
            },
            options: {
                type: Array as PropType<FormOptions[]>,
                required: true
            },
            onChange: {
                type: Function
            },
            beforeUpload: {
                type: Function
            },
            onPreview: {
                type: Function
            },
            onRemove: {
                type: Function
            },
            beforeRemove: {
                type: Function
            },
            onSuccess: {
                type: Function
            },
            onExceed: {
                type: Function
            },
        }),
        emits = defineEmits(['update:visible']);

    // 弹出框的显示与隐藏
    const dialogVisible = ref<boolean>(props.visible),
        form = ref<any>(null);// 表单实例1
    
    watch(() => props.visible, val => {
        dialogVisible.value = val
    })
    watch(() => dialogVisible.value, val => {
        emits('update:visible', val)
    })
</script>
    
<style lang='scss' scoped></style>
