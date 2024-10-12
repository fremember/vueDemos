<template>
    <div>
        <f-choose-time :startOptions="startOptions" @startChange="startChange" @endChange="endChange" />
        <br />
        <f-choose-date :disableToday="false" :startOptions="startOptions" @startChange="dateStartChange" @endChange="dateEndChange" />
    </div>
</template>
    
<script lang='ts' setup>
    interface endValue {
        startTime: string,
        endTime: string
    }
    interface dateEndValue {
        startDate: Date,
        endDate: Date
    }
    const startChange = (val: string) => {
        console.log('startChange', val)
    }
    const endChange = (val: endValue) => {
        console.log('endChange', val)
    }
    const dateStartChange = (val: Date) => {
        console.log(val)
    }
    const dateEndChange = (val: dateEndValue) => {
        console.log(val)
    }
    const startOptions = {}
</script>
    
<style lang='scss' scoped></style>
    