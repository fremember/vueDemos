<!--
 * @Author: fremember
 * @Date: 2021-06-28 19:25:06
 * @Description: 提示信息
-->
<template>
    <a-alert class="mb16px" :message="message" :description="description" type="warning" closable @close="onClose" />
</template>
<script type="text/ecmascript-6">
    import { ref, computed, defineComponent, onMounted } from 'vue'
    import { formatDate, getTimestamp, getDay } from '@/util/common'
    import { useStore } from 'vuex'
    export default defineComponent ({
        name: 'Notice',
        setup () {
            let store = useStore(),
                curStr = ref(''),
                curDay = ref(''),
                curTimestamp = ref(''),
                username = computed(() => store.getters['user/username']),
                message = ref(''),
                description = ref('欢迎使用vue3.0 + ant-design-vue2.0模版。本项目全面拥抱vue3.0，主要涉及内容有：数据统计(图标、表格)、canvas、动画、自定义组件。'),
                changeCur = () => {
                    curStr.value = formatDate('yyyy年MM月dd日 HH:mm:ss', '')
                    message.value = `亲爱的${username.value}，${curTimestamp.value}好！当前时间为：${curStr.value} ${curDay.value}`
                },
                onClose = (e) => {
                    console.log('I was closed.')
                };
            onMounted(() => {
                changeCur()
                setInterval(changeCur, 1000)
                curTimestamp.value = getTimestamp()
                curDay.value = getDay()
                message.value = `亲爱的${username.value}，${curTimestamp.value}好！当前时间为：${curStr.value} ${curDay.value}`
            })
            return {
                message,
                description,
                onClose
            }
        }
    })
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../assets/stylus/reset'
    .dashboard {
    }
</style>