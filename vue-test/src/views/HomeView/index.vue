<template name="HomeView">
    <section class="home-view" @click="changeRouter">home-view</section>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router'

    const router = useRouter();

    const changeRouter = () => {
        router.push('/login')
    }
</script>