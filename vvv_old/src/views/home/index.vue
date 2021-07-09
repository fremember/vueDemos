<!--
 * @Author: fremember
 * @Date: 2021-06-15 11:00:11
 * @Description: Home
-->
<template>
    <div class="home">
        {{ msg }}
    </div>
</template>
<script type="text/ecmascript-6">
import { ref } from 'vue'
export default {
    setup () {
        let msg = ref('home');
        return {
            msg
        }
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>