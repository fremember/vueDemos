<template>
    <div>
        <el-select clearable placeholder="请选择省份" v-model="province">
            <el-option v-for="item in areas" :key="item.code" :value="item.code" :label="item.name"></el-option>
        </el-select>
        <el-select clearable :disabled="!province" placeholder="请选择城市" style="margin: 0 10px;" v-model="city">
            <el-option v-for="item in selectCity" :key="item.code" :value="item.code" :label="item.name"></el-option>
        </el-select>
        <el-select clearable :disabled="!province || !city" placeholder="请选择区域" v-model="area">
            <el-option v-for="item in selectArea" :key="item.code" :value="item.code" :label="item.name"></el-option>
        </el-select>
    </div>
</template>
    
<script lang='ts' setup>
    import { ref, watch } from 'vue';
    import allAreas from './../lib/pca-code.json'

    interface Data {
        name: string,
        code: string
    }
    interface AreaItem extends Data {
        children?: AreaItem[]
    }

    // 下拉框选择省份的值
    const province = ref<string>('')
    // 下拉框选择城市的值
    const city = ref<string>('')
    // 下拉框选择区域的值
    const area = ref<string>('')
    // 所有的省市区数据
    const areas = ref(allAreas)

    // 城市下拉框的所有的值
    const selectCity = ref<AreaItem[]>([])

    // 区域下拉框的所有的值
    const selectArea = ref<AreaItem[]>([])

    // 分发事件给父组件
    const emits = defineEmits(['change'])

    // 监听选择省份
    watch(() => province.value, val => {
        if (val) {
            selectCity.value = areas.value.find(item => item.code == val)!.children!
        }
        city.value = ''
        area.value = ''
    })
    // 监听选择城市
    watch(() => city.value, val => {
        if (val) {
            selectArea.value = selectCity.value.find(item => item.code == val)!.children!
        }
        area.value = ''
    })
    // 监听选择区域
    watch(() => area.value, val => {
        if (val) {
            let provinceData: Data = {
                code: province.value,
                name: province.value && allAreas.find(item => item.code == province.value)!.name
            }
            let cityData: Data = {
                code: city.value,
                name: city.value && selectCity.value.find(item => item.code == city.value)!.name
            }
            let areaData: Data = {
                code: area.value,
                name: area.value && selectArea.value.find(item => item.code == area.value)!.name
            }
            emits('change', {
                province: provinceData,
                city: cityData,
                area: areaData
            })
        }
    })
</script>
    
<style lang='scss' scoped></style>