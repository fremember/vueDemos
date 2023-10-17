<template>
    <div>
        <f-choose-city @changeCity="changeCity" @changeProvince="changeProvince" />
    </div>
</template>
    
<script lang='ts' setup>
    const changeCity = (item: any) => {
            console.log(1)
            console.log(item)
        },
        changeProvince = (item: any) => {
            console.log(2)
            console.log(item)
        };
</script>
    
<style lang='scss' scoped></style>
    