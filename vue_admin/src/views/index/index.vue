<!--
 * @Author: fremember
 * @Date: 2021-05-13 18:17:56
 * @Description: 首页
-->
<template>
    <section>
        {{ msg }}
    </section>
</template>

<script type="ts">
    import { ref, defineComponent } from 'vue'
    export default defineComponent({
        name: 'Index',
        setup () {
            let msg = ref('index')
            return {
                msg 
            }
        }
    })
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>