<!--
 * @Author: fremember
 * @Date: 2021-09-24 11:36:29
 * @Description: 
-->
<template>
    <div class="validate-code">
        <div class="cur-p" v-html="ajaxResult" @click="getVerificationCode"></div>
    </div>
</template>
<script lang="ts">
    import { defineComponent, ref, computed, onMounted } from 'vue'
    import { useStore } from 'vuex'
    export default defineComponent({
        name: 'ValidateCode',
        setup () {
            let store = useStore(),
                ajaxResult = computed(() => store.getters['common/validateCodeSvg']),
                getVerificationCode = () => {
                    store.dispatch('common/setValidateCodeSvg', {
                        size: 4,  //验证码长度
                        width: 121,
                        height: 40,
                        background: "#f4f3f2",//干扰线条数
                        noise: 2,
                        fontSize: 36,
                        ignoreChars: '0o1i',   //验证码字符中排除'0o1i'
                        color: true // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
                    })
                };
            onMounted(() => {
                getVerificationCode()
            })
            return {
                ajaxResult,
                getVerificationCode
            }
        }
    })
</script>
<style scoprd lang="stylus">
    @import './../../assets/stylus/reset'
</style>