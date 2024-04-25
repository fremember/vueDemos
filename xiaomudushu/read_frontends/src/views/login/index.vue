<template name="login-view">
    <section class="login" @click="changeRouter">login</section>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const changeRouter = () => {
        router.push('/layout')
    }
</script>


<style scoped>
</style>
