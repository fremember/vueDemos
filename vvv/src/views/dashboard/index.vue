<!--
 * @Author: fremember
 * @Date: 2021-06-28 18:09:56
 * @Description: 入口文件
-->
<template>
    <section class="dashboard">
        <notice />
        <a-row :gutter="16">
            <a-col class="gutter-row" :span="12">
                <system class="mb10px" />
                <news />
            </a-col>
            <a-col class="gutter-row" :span="12">
                <!-- <skills class="mb10px" />
                <panel /> -->
                <div class="right">right</div>
            </a-col>
        </a-row>
    </section>
</template>
<script type="text/ecmascript-6">
    import { defineComponent } from 'vue'
    import Notice from './notice/index.vue'
    import System from './system/index.vue'
    import News from './news/index.vue'
    import Skills from './skills/index.vue'
    import Panel from './panel/index.vue'
    export default defineComponent ({
        name: 'Dashboard',
        components: { Notice, System, News, Skills, Panel },
        setup () {
        }
    })
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../assets/stylus/reset'
    .dashboard {
        ol, ul, dl {
            margin-bottom(0)
        }
    }
</style>