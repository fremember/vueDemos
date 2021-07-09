<!--
 * @Author: fremember
 * @Date: 2021-06-29 15:26:19
 * @Description: 技能
-->
<template>
    <div class="skills">
        <div class="mine-table-title">我的技能</div>
        <div class="pos-r content" :ref="skillsDom">
            <span class="cur-p pos-a" v-for="(skill, index) in skills" :key="index" :ref="itemDom" @click="skillEvent(skill)">{{ skill.name }}</span>
        </div>
    </div>
</template>s
<script type="text/ecmascript-6">
    import { defineComponent, ref, onMounted, nextTick, computed } from 'vue'
    import { mineMove } from './skillMove'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    export default defineComponent ({
        name: 'Skills',
        setup () {
            let store = useStore(),
                router = useRouter(),
                skills = computed(() => store.getters['user/skills']),
                skillsEle = ref(null),
                skillsDom = el => {
                    skillsEle.value = el
                },
                itemEle = ref([]),
                itemDom = el => {
                    itemEle.value.push(el)
                },
                initMove = () => {
                    nextTick(() => {
                        mineMove(skillsEle.value, itemEle.value)
                    })
                },
                skillEvent = (skill) => {
                    router.push(skill.url)
                };
            onMounted(() => {
                initMove()
                window.onresize = () => {
                    initMove()
                }
            })
            return {
                skills,
                skillsDom,
                itemDom,
                skillEvent
            }
        }
    })
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../assets/stylus/reset'
    @import './../../../assets/stylus/common'
    .skills {
        .content {
            margin-auto(10px)
            width(400px)
            height(360px)
            span {
                top(0)
                left(0)
                font-weight(550)
                padding-t-b(3px)
                padding-l-r(6px)
                &:hover {
                    border: 1px solid #eee
                    background(#42b983)
                    border-radius(5px)
                }
            }
        }
    }
</style>