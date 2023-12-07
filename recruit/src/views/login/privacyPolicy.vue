<script setup lang="ts">
    import { ref, reactive } from 'vue';
    import { getPolicy } from '@/api/user';
    import { Toast } from 'vant';
    const state = reactive({
        htmlText: ''
    })
    const onClickLeft = () => history.back();
    const getPolicyChange = async () => {
        const res = await getPolicy({
            id: 16
        })
        if (res) {
            state.htmlText = res.records[0].content
        } else {
            Toast(res.msg)
        }
    }
    getPolicyChange()
</script>
<template>
    <section class="common-layout">
        <van-nav-bar
            title="隐私政策"
            left-text=""
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="cl-content cl-login-content" v-html="state.htmlText"></div>
    </section>
</template>
<style scoped></style>