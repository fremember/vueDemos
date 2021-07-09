<!--
 * @Author: fremember
 * @Date: 2021-06-29 10:45:00
 * @Description: 最新文章
-->
<template>
    <section class="system">
        <div class="mine-table-title">
            最新文章 <mine-icon class="colorf00" componentName="FireOutlined" />
        </div>
        <ul class="like-table">
            <li class="flex ai-c jc-s lt-list" v-for="(item, index) in tables" :key="index">
                <div class="cur-p flex_1 ltl-cont">{{ item.cont }}</div>
            </li>
        </ul>
    </section>
</template>
<script type="text/ecmascript-6">
    import { defineComponent, ref } from 'vue'
    import MineIcon from '@/components/mineIcon/index.vue'
    export default defineComponent ({
        name: 'News',
        components: { MineIcon },
        setup () {
            let tables = ref([
                { label: '开发版本', cont: 'v1.0.0' },
                { label: '开发作者', cont: 'fremember' },
                { label: '前端开发', cont: 'vue3.0 + ant-design-vue2.0' },
                { label: '后端开发', cont: 'node + express' },
                { label: '数据库', cont: 'mongodb' },
                { label: '最大上传限制', cont: '2M' },
                { label: '当前用户权限', cont: '超级管理员' },
                { label: '当前用户权限2', cont: '超级管理员' }
            ])
            return {
                tables
            }
        }
    })
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../assets/stylus/reset'
    @import './../../../assets/stylus/common'
    .system {
        .colorf00 {
            font-color(#f00)
        }
        .like-table {
            li {
                .ltl-cont {
                    &:hover {
                        font-color(#42b983)
                    }
                }
            }
        }
    }
</style>