<template>
    <section class="trend">
        <div>
            <f-trend text="营业额" />
        </div>
        <div>
            <f-trend text="销售额" type="down" />
        </div>
        <div>
            <f-trend :reverseColor="true">qw</f-trend>
        </div>
    </section>
</template>
    
<script lang='ts' setup>

</script>
    
<style lang='scss' scoped>
    .trend {
        display: flex;
        > div {
            margin-right: 10px;
        }
    }
</style>
    