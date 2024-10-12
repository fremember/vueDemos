<template>
    <el-popover
        v-model:visible="visible"
        placement="bottom-start"
        :width="430"
        trigger="click"
    >
        <template #reference>
            <div class="result">
                <div>{{ result }}</div>
                <div>
                    <el-icon-arrowdown :class="{ 'rotate': visible }" />
                </div>
            </div>
        </template>
        <div class="container">
            <el-row>
                <el-col :span="8">
                    <el-radio-group v-model="radioValue" size="small">
                        <el-radio-button label="按城市"></el-radio-button>
                        <el-radio-button label="按省份"></el-radio-button>
                    </el-radio-group>
                </el-col>
                <el-col :offset="1" :span="15">
                    <el-select
                        @change="changeSelect"
                        placeholder="按搜索城市"
                        size="small"
                        v-model="selectValue"
                        filterable
                        :filter-method="filterMethod"
                    >
                        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-col>
            </el-row>
            <template v-if="radioValue === '按城市'">
                <div class="city">
                    <div class="city-item" v-for="(item, index) in Object.keys(cities)" :key="index" @click="clickChat(item)">{{ item }}</div>
                </div>
                <el-scrollbar max-height="300px">
                    <template v-for="(value, key) in cities" :key="key">
                        <el-row style="margin-bottom: 10px;" :id="key">
                            <el-col :span="2">{{ key }}:</el-col>
                            <el-col :span="22" class="city-name">
                                <div class="city-name-item" v-for="item in value" :key="item.id" @click="clickItem(item)">{{ item.name }}</div>
                            </el-col>
                        </el-row>
                    </template>
                </el-scrollbar>
            </template>
            <template v-else>
                <div class="province">
                    <div class="province-item" v-for="(item, index) in Object.keys(provinces)" :key="index" @click="clickChat(item)">{{ item }}</div>
                    <el-scrollbar max-height="300px">
                        <template v-for="(item, index) in Object.values(provinces)" :key="index">
                            <template v-for="(item1, index1) in item" :key="index1">
                                <el-row style="margin-bottom: 10px;" :id="item1.id">
                                    <el-col :span="3">{{ item1.name }}:</el-col>
                                    <el-col :span="21" class="province-name">
                                        <div class="province-name-item" v-for="(item2, index2) in item1.data" :key="index2" @click="clickProvince(item2)">{{ item2 }}</div>
                                    </el-col>
                                </el-row>
                            </template>
                        </template>
                    </el-scrollbar>
                </div>
            </template>
        </div>
    </el-popover>
</template>
    
<script lang='ts' setup>
    import { ref, onMounted } from 'vue'
    import city from '../lib/city'
    import province from '../lib/province.json'
    import { City } from './types'

    const emits = defineEmits(['changeCity', 'changeProvince']) // 分发事件

    const visible = ref<boolean>(false), // 控制弹出层的显示
        result = ref<string>('请选择'), // 最终选择的结果
        radioValue = ref<string>('按城市'), // 单选框的值 按城市还是按省份选择
        selectValue = ref<string>(''), // 下拉框的值 搜索下拉框
        options = ref<City[]>([]), // 下拉框显示城市的数据
        cities = ref(city.cities), // 所有的城市数据
        provinces = ref(province), // 所有省份的数据
        allCity = ref<City[]>([]); // 所有的城市数据
    
    const clickItem = (item: City) => { // 点击每个城市
            // 给结果赋值
            result.value = item.name
            // 关闭弹出层
            visible.value = false
            emits('changeCity', item)
        },
        clickProvince = (item: string) => { // 点击省份
            // 给结果赋值
            result.value = item
            // 关闭弹出层
            visible.value = false
            emits('changeProvince', item)
        },
        clickChat = (item: string) => { // 点击字母区域
            const el = document.getElementById(item)
            el && el.scrollIntoView()
        },
        filterMethod = (val: string) => { // 自定义搜索过滤
            const values = Object.values(cities.value).flat(2)
            if (val === '') {
                options.value = values
            } else {
                if (radioValue.value === '按城市') {
                    // 中文和拼音一起过滤
                    options.value = values.filter(item => {
                        return item.name.includes(val) || item.spell.includes(val)
                    })
                } else {
                    // 中文过滤
                    options.value = values.filter(item => {
                        return item.name.includes(val)
                    })
                }
            }
        },
        changeSelect = (val: number) => { // 下拉框选择
            const city = allCity.value.find(item => item.id === val)!
            result.value = city.name
            if (radioValue.value === '按城市') {
                emits('changeCity', city)
            } else {
                emits('changeProvince', city.name)
            }
        };
    
    onMounted(() => {
        const values = Object.values(cities.value).flat(2)
        allCity.value = values
        options.value = values
    })
</script>
    
<style lang='scss' scoped>
    .result {
        display: flex;
        align-items: center;
        width: fit-content;
        cursor: pointer;
    }
    .rotate {
        transform: rotate(180deg);
    }
    svg {
        width: 1em;
        height: 1em;
        position: relative;
        top: 2px;
        margin-left: 4px;
        transition: all 0.25s linear;
    }
    .container {
        padding: 6px;
    }
    .city,
    .province {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 10px;
        margin-bottom: 10px;
        &-item {
            padding: 3px 6px;
            margin-right: 8px;
            border: 1px solid #eee;
            margin-bottom: 8px;
            cursor: pointer;
        }
    }
    .city-name,
    .province-name {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .city-name-item,
        .province-name-item {
            margin-right: 6px;
            margin-bottom: 6px;
            cursor: pointer;
        }
    }
</style>
    