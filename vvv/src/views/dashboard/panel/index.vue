<!--
 * @Author: fremember
 * @Date: 2021-06-29 17:58:08
 * @Description: 仪表盘
-->
<template>
    <div class="panel">
        <div class="mine-table-title">Canvas仪表盘</div>
        <div class="flex ai-c jc-c canvas-wrapper">
            <canvas class="canvas1" :ref="canvas1" width="260" height="260"></canvas>
            <canvas class="canvas2" :ref="canvas2" width="260" height="260"></canvas>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { defineComponent, ref, onMounted, nextTick } from 'vue'
    import { Panel } from './panel'
    export default defineComponent({
        name: 'Panel',
        setup () {
            let canvasDom1 = ref(null),
                canvasDom2 = ref(null),
                canvas1 = el => {
                    canvasDom1.value = el
                },
                canvas2 = el => {
                    canvasDom2.value = el
                },
                initCanvas = () => {
                    nextTick(() => {
                        let commonSets = {
                                tick_length: 12,
                                large_tick_length: 22,
                                tick_thickness: 1,
                                tick_group_length: 9,
                                ticks_groups_begin: 0,
                                total_degrees: 250,
                                total_tick: 101,
                                tick_color: '#666',
                                num_font_size: 18,
                                percent: 0,
                                center_font_size: 45,
                                tick_on_color: '#f1594e',
                                cur_score_circle_color: '#ff5e52',
                                center_text_unit: '%'
                            },
                            panel1 = new Panel({
                                ...commonSets,
                                on_color_gradient: [
                                    { color: "#9ED110", percent: 0 },
                                    { color: "#50B517", percent: 10 },
                                    { color: "#8adec2", percent: 20 },
                                    { color: "#08d9fb", percent: 40 },
                                    { color: "#883efd", percent: 50 },
                                    { color: "#FF5800", percent: 60 },
                                    { color: "#FF8100", percent: 70 },
                                    { color: "#FEAC00", percent: 80 },
                                    { color: "#FFCC00", percent: 90 },
                                    { color: "#ff0000", percent: 100 }
                                ],
                                animation_duration: 2000,
                                center_font_color: '#a0a0a0',
                                canvas: canvasDom1.value
                            }),
                            panel2 = new Panel({
                                ...commonSets,
                                center_font_color: '#ff5e52',
                                animation_duration: 1000,
                                canvas: canvasDom2.value
                            });
                        panel1.render()
                        setTimeout(function () {
                        	panel1.updatePercent(100)   //默认设置多少百分比
                        }, 3000)
                        panel2.render(20)
                        setTimeout(function () {
                        	panel2.updatePercent(60)   //默认设置多少百分比
                        }, 3000)
                    })
                };
            onMounted(() => {
                initCanvas()
            })
            return {
                canvas1,
                canvas2
            }
        }
    })
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../assets/stylus/reset'
    @import './../../../assets/stylus/common'
    .panel {
        .canvas-wrapper {
            padding-top(30px)
            .canvas2 {
                margin-left(30px)
            }
        }
    }
</style>