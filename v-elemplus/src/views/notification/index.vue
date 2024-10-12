<template>
    <notification :value="50">
        <template #default>
            <f-tab @clickItem="clickItem" @clickAction="clickAction" :list="list" :actions="actions" />
        </template>
    </notification>
</template>
    
<script lang='ts' setup>
    import { list, actions } from './data'

    let clickItem = (val: any) => {
        console.log(val)
    }
    let clickAction = (val: any) => {
        console.log(val)
    }
</script>
    
<style lang='scss' scoped></style>
    