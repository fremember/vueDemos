<template name="IconSelect">
    <div class="flex items-center">
        <el-icon :size="20" v-if="modelValue" class="mr-2">
            <component :is="modelValue"></component>
        </el-icon>
        <el-select
            filterable
            :modelValue="modelValue"
            class="m-2"
            placeholder="选择图标"
            @change="handleChange"
        >
            <el-option
                v-for="item in icons"
                :key="item"
                :label="item"
                :value="item"
            >
                <div class="flex items-center justify-between">
                    <el-icon>
                        <component :is="item"></component>
                        <span class="text-gray-500">{{ item }}</span>
                    </el-icon>
                </div>
            </el-option>
        </el-select>
    </div>
</template>
<script setup>
    import { ref } from 'vue'
    import * as iconList from '@element-plus/icons-vue'

    defineProps({
        modelValue: String
    })

    console.log(iconList)
    const icons = ref(Object.keys(iconList)),
        emit = defineEmits(['update:modelValue']),
        handleChange = (icon) => {
            emit('update:modelValue', icon)
        }
</script>