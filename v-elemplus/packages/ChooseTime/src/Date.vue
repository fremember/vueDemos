<template>
    <div style="display: flex;">
        <div style="margin-right: 20px;">
            <el-date-picker
                v-model="startDate"
                type="date"
                :placeholder="startPlaceholder"
                :disabledDate="startDisabledDate"
                v-bind="$attrs.startOptions"
            />
        </div>
        <div>
            <el-date-picker
                v-model="endDate"
                type="date"
                :placeholder="endPlaceholder"
                :disabled="endDateDisabled"
                :disabledDate="endDisabledDate"
                v-bind="$attrs.endOptions"
            />
        </div>
    </div>
</template>
    
<script lang='ts' setup>
    import { ref, watch } from 'vue'

    const props = defineProps({
        // 开始日期的占位符
        startPlaceholder: {
            type: String,
            default: '请选择开始日期'
        },
        // 结束日期的占位符
        endPlaceholder: {
            type: String,
            default: '请选择结束日期'
        },
        // 是否禁用选择今天之前的日期
        disableToday: {
            type: Boolean,
            default: true
        }
    })
    const emits = defineEmits(['startChange', 'endChange'])

    const startDate = ref<Date | null>(null), // 开始日期
        endDate = ref<Date | null>(null), // 结束日期
        endDateDisabled = ref<boolean>(true); // 控制结束日期的禁用状态
    
    const startDisabledDate = (time: Date) => { // 禁用开始日期的函数
            if (props.disableToday) return time.getTime() < Date.now() - 1000 * 60 * 60 * 24
        },
        endDisabledDate = (time: Date) => { // 禁用结束日期的函数
            if (startDate.value) {
                return time.getTime() < startDate.value.getTime() + 1000 * 60 * 60 * 24
            }
        };
    watch(() => startDate.value, val => {
        if (!val) {
            endDateDisabled.value = true
            endDate.value = null    
        } else {
            emits('startChange', val)
            endDateDisabled.value = false
        }
    })
    watch(() => endDate.value, val => {
        if (val) {
            emits('endChange', {
                startDate: startDate.value,
                endDate: val
            })
        }
    })
</script>
    
<style lang='scss' scoped></style>
    