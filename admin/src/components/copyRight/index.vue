<!--
 * @Author: fremember
 * @Date: 2021-09-24 10:50:21
 * @Description: 
-->
<template>
    <div class="pos-f tac copy-right">
        <p>技术栈信息：vue3.0+vuex4.0+vue-router4.0 &nbsp;&nbsp; 开发者：fremember（github同号）</p> 
        <p>Copyright &copy; 2021 - 2024 fremember.com. All Rights Reserved.</p>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'CopyRight',
    })
</script>
<style scoprd lang="stylus">
    @import './../../assets/stylus/reset'
    .copy-right {
        bottom(10px)
        left(50%)
        transform: translateX(-50%)
        line-height(18px)
        font-size(12px)
        font-color(#ccc)
        p {
            margin-all(0)
        }
    }
</style>