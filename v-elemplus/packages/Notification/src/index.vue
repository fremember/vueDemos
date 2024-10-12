<template>
    <el-popover popper-class="notification-popper-class" placement="bottom" :width="300" trigger="click">
        <template #default>
            <!-- 弹窗显示的内容 -->
            <slot />
        </template>
        <!-- 显示的内容 -->
        <template #reference>
            <el-badge style="cursor: pointer" :value="value" :max="max" :is-dot="isDot">
                <component :is="`el-icon-${toLine(icon)}`" />
            </el-badge>
        </template>
    </el-popover>
</template>
    
<script lang='ts' setup>
    import { toLine } from './../../utils'
    const props = defineProps({
        // 显示的图标
        icon: {
            type: String,
            default: 'Bell'
        },
        // 通知数量
        value: {
            type: [String, Number],
            default: ''
        },
        // 最大值
        max: {
            type: Number,
            default: 99
        },
        // 是否显示小圆点
        isDot: {
            type: Boolean,
            default: false
        }
    })
</script>
    
<style lang='scss' scoped>
    svg {
        width: 1.5em;
        height: 1.5em;
    }
</style>
    