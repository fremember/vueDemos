<template>
    <Button type="success" ref="buttonRef" @click="testClick">Test Button</Button>
    <Button>normal</Button>
    <Button plain>plain</Button>
    <Button round>round</Button>
    <Button circle>circle</Button>
    <Button disabled>disabled</Button>
    <Button plain size="large">round</Button>
</template>
<!-- <script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'FuiButton'
    })
</script> -->
<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import Button from './components/Button/index.vue'
    import type { ButtonInstance } from './components/Button/types'

    const buttonRef = ref<ButtonInstance | null>(null)

    onMounted(() => {
        if (buttonRef.value) {
            console.log(buttonRef.value.ref)
        }
    })
    const testClick = () => {
        console.log(123)
    }
</script>

<style scoped>
</style>
