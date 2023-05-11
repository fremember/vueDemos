<template name="home-view">
    <div class="home" @click="changeRoute">
        home
    </div>
</template>

<script setup>
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import { notification, showModel } from '@/utils/element-plus'

    const store = useStore(),
        router = useRouter(),
        userInfo = computed(() => store.getters['manager/userInfo']),
        changeRoute = () => {
            showModel({ context: '是否要确定退出登录' }).then(() => {
                store.dispatch('manager/logout').then(() => {
                    router.push({ name: 'login-view' })
                    notification({ message: '退出成功', type: 'success' })
                })
            }).catch(err => {
                console.log(err)
            })
        };
</script>

<style scoped></style>