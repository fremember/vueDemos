<template>
    <f-choose-area @change="changeArea" />
</template>
    
<script lang='ts' setup>
    const changeArea = (val: any) => {
        console.log(val)
    }
</script>
    
<style lang='scss' scoped></style>