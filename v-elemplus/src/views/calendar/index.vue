<template>
    <f-calendar :events="events" :eventContent="eventContent" @date-click="dateClick" />
</template>
    
<script lang='ts' setup>
    import { DateClickArg } from '_@fullcalendar_interaction@5.10.1@@fullcalendar/interaction'
    import { EventItem } from '../../components/Calendar/src/types'
    import { ref } from 'vue'
    import { EventContentArg } from '@fullcalendar/core'

    const events = ref<EventItem[]>([
        {
            title: '购物',
            start: '2023-10-14 23:47:00',
            end: '2023-10-15 10:00:00',
            editable: true
        },
        {
            title: '午休',
            start: '3023-10-15 12:00:00',
            end: '2023-10-15 13:00:00',
            editable: true
        }
    ]);

    const dateClick = (info: DateClickArg) => {
            const event = {
                start: `${info.dateStr} 12:00:00`,
                end: `${info.dateStr} 13:00:00`,
                title: '吃饭'
            }
            events.value.push(event)
            console.log(info)
        },
        eventContent = (arg: EventContentArg) => {
            const el = document.createElement('div'),
                timeTextArr = arg.timeText.split(' - '),
                start = timeTextArr[0].replace('上午', '').replace('时', ''),
                end = timeTextArr[0].replace('下午', '').replace('时', '');
            el.innerHTML = `
                <div>标题：${arg.event._def.title}</div>
                <div>开始时间：${start}</div>
                <div>结束时间：${end}</div>
            `
            return {
                domNodes: [el]
            }
        };
</script>
    
<style lang='scss' scoped></style>
    