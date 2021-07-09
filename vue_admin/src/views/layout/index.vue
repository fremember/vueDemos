<!--
 * @Author: fremember
 * @Date: 2021-05-13 18:06:50
 * @Description: 
-->
<template>
    <section>
        {{ msg }}
    </section>
</template>

<script type="ts">
    import { ref, defineComponent } from 'vue'
    export default defineComponent({
        name: 'Layout',
        setup () {
            let msg = ref('layout')
            return {
                msg 
            }
        }
    })
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>