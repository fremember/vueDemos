<template>
    <el-progress :percentage="p" v-bind="$attrs" />
</template>
    
<script lang='ts' setup>
    import { onMounted, ref } from 'vue'
    const props = defineProps({
        // 进度条进度
        percentage: {
            type: Number,
            required: true
        },
        // 是否有动画效果
        isAnimate: {
            type: Boolean,
            default: false
        },
        // 动画时长(毫秒)
        time: {
            type: Number,
            default: 3000
        }
    });
    // // 标识动画加载过程中改变的值
    // const num = ref<number>(0);
    const p = ref(0);
    onMounted(() => {
        if (props.isAnimate) {
            // 规定时间内加载完成
            const t = Math.ceil(props.time / props.percentage)
            const timer = setInterval(() => {
                p.value += 1
                if(p.value >= props.percentage) {
                    p.value = props.percentage
                    clearInterval(timer)
                }
            }, t)
        }
    })
</script>
    
<style lang='scss' scoped></style>
    