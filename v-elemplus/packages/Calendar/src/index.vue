<template>
    <div id="calendar"></div>
</template>
    
<script lang='ts' setup>
    import { ref, PropType, nextTick, watch, onMounted } from 'vue'
    // 在vite里面使用fullcalendar 需要引入一个包
    // import '@fullcalendar/core/Edom'
    import { Calendar, EventClickArg } from '@fullcalendar/core'
    import daygridPlugin from '@fullcalendar/daygrid'
    import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'

    import { EventItem } from './types'

    const props = defineProps({
        local: { // 日历显示的语言
            type: String,
            default: 'zh-cn'
        },
        initialView: { // 试图模式
            type: String,
            default: 'dayGridMonth'
        },
        buttonText: { // 按钮文字
            type: Object,
            default: () => {
                return {
                    today: '今天',
                    month: '月',
                    week: '周',
                    day: '日',
                    prevYear: '上一年',
                    nextYear: '下一年',
                    prev: '上一月',
                    next: '下一月'
                }
            }
        },
        headerToolbar: { // 头部工具栏
            type: Object,
            default: () => {
                return {
                    start: 'title',
                    center: '',
                    end: 'prev today next'
                }
            }
        },
        // 底部工具栏
        footerToolbar: {
            type: Object
        },
        events: {
            type: Array as PropType<EventItem[]>,
            default: () => []
        },
        eventContent: { // 自定义渲染内容
            type: Function
        }
    }),
    emits = defineEmits(['date-click', 'event-click']);

    const calendar = ref<Calendar>(), // 日历对象
        renderCalendar = () => { // 生成日历的方法
            nextTick(() => {
                const el = document.getElementById('calendar')
                if (el) {
                    // 日历的配置选项
                    calendar.value = new Calendar(el, {
                        plugins: [ daygridPlugin, interactionPlugin ], // 使用到的插件
                        initialView: props.initialView, // 视图模式
                        locale: props.local, // 语言
                        buttonText: props.buttonText, // 按钮文字
                        headerToolbar: props.headerToolbar, // 头部工具栏
                        footerToolbar: props.footerToolbar, // 底部工具栏
                        eventSources: [
                            {
                                events(e, callback) {
                                    if (props.events.length) callback(props.events)
                                    else callback([])
                                }
                            }
                        ],
                        dateClick(info: DateClickArg) { // 点击日历的某一天
                            emits('date-click', info)
                        },
                        eventClick(info: EventClickArg) { // 点击日历上的时间
                            emits('event-click', info)
                        },
                        displayEventEnd: true, // 显示事件的结束时间
                        eventContent: props.eventContent // 自定义渲染内容
                    })
                    calendar.value.render()
                }
            })
        };

    // 监听事件源的变化
    watch(() => props.events, () => {
        renderCalendar()
    }, {deep: true})

    onMounted(() => {
        renderCalendar()
    })
</script>
    
<style lang='scss' scoped>
    svg {
        width: 1em;
        height: 1em;
    }
</style>
    