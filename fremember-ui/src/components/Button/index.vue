<template>
    <button
        ref="_ref"
        class="fui-button"
        :class="{
            [`fui-button--${type}`]: type,
            [`fui-button--${size}`]: size,
            'is-plain': plain,
            'is-round': round,
            'is-circle': circle,
            'is-disabled': disabled
        }"
        :disabled="disabled"
        :autofocus="autofocus"
        :type="nativeType"
    >
        <span>
            <slot />
        </span>
    </button>
</template>
    
<script lang='ts' setup>
    import { ref } from 'vue'
    // 泛型的使用方式
    import type { ButtonProps } from './types'
    defineOptions({
        name: 'FuiButton'
    })
    withDefaults(defineProps<ButtonProps>(), {
        nativeType: 'button'
    })

    const _ref = ref<HTMLButtonElement>()

    defineExpose({
        ref: _ref
    })

    // 使用对象字面量
    // import { buttonProps } from './types'
    // defineProps(buttonProps)
</script>
    
<style lang='stylus' scoped></style>
    