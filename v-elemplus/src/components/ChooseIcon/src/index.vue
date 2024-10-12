<template>
    <el-button type="primary" @click="handleClick">
        <slot />
    </el-button>
    <div class="choose-icon-dialog-body-height">
        <el-dialog :title="props.title" v-model="dialogVisible">
            <div class="container">
                <div
                    class="item"
                    v-for="(item, index) in Object.keys(ElIcons)"
                    :key="index"
                    @click="clickItem(item)"
                >
                    <div class="text">
                        <component :is="`el-icon-${toLine(item)}`" />
                    </div>
                    <div class="icon">{{ item }}</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
    
<script lang='ts' setup>
    import { ref, watch } from 'vue';
    import * as ElIcons from '@element-plus/icons-vue';
    import { toLine } from '../../../utils/index';
    import { useCopy } from '../../../hooks/useCopy';
    const props = defineProps<{
        title: string,// 弹出框的标题
        visible: boolean// 控制弹出框的显示与隐藏
    }>();
    const emits = defineEmits(['update:visible']);

    let dialogVisible = ref<boolean>(props.visible)

    // 点击按钮显示弹出框
    const handleClick = () => {
        // 需要修改父组件的数据
        emits('update:visible', !props.visible);
    };
    const clickItem = (item: string) => {
        let text = `<el-icon-${toLine(item)} />`;
        // 复制文本
        useCopy(text);
        // 关闭弹框
        dialogVisible.value = false;
    };

    // 监听visible的变化 只能监听第一次的变化
    watch(() => props.visible, val => {
        dialogVisible.value = val
    });
    // 监听组件内部的dialogVisible变化
    watch(() => dialogVisible.value, val => {
        emits('update:visible', val);
    });
</script>
    
<style lang='scss' scoped>
    .container {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .item {
            width: 25%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            cursor: pointer;
            height: 70px;
            .text {
                font-size: 14px;
                svg {
                    width: 2em;
                    height: 2em;
                }
            }
            .icon {
                flex: 1;
            }
        }
    }
</style>
    