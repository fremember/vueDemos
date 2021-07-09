<!--
 * @Author: fremember
 * @Date: 2021-06-24 08:45:56
 * @Description: 已打开路由的tabs
-->
<template>
    <div class="tags-view-container">
        <!-- <scroll-pane class="tags-view-wrapper">
            <router-link
                class="cur-p tags-view-item"
                :class="isActive(item) ? 'active' : ''"
                ref="tag"
                :to="item.fullPath"
                v-for="(item, index) in tabs" :key="index"
                @contextmenu.prevent.stop="openMenu(tag, $event)">
                {{ item.title }}
                <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(item)" />
            </router-link>
        </scroll-pane> -->
        <ul class="flex ai-c jc-c">
            <li @click="aaaa">hshs</li>
            <li>hshs</li>
        </ul>
    </div>
</template>
<script lang="ts">
    import { watch, computed, defineComponent, getCurrentInstance } from 'vue'
    import { RouteRecordRaw } from 'vue-router'
    import { mapGetters, useStore } from 'vuex'
    import ScrollPane from './../scrollPane/index.vue'
    import { formatQueryString } from '@/util/tool'
    import commonSettings from '@/config'
    let { routesWhiteList } = commonSettings

    export default defineComponent({
        name: 'SubNav',
        components: { ScrollPane },
        setup () {
            let { proxy } = getCurrentInstance(),
                store = useStore(),
                getters = mapGetters('tabs', ['tabs']),
                tabs = computed(getters.tabs.bind({ $store: store })),
                isActive = (item) => {
                    return item.fullPath === proxy.$router.currentRoute.value.fullPath
                },
                openMenu = (item, ev) => {
                    // console.log(item)
                    // console.log(ev)
                    console.log(1111)
                },
                closeSelectedTag = (tab) => {
                    console.log(2222)
                    // if (isActive(tab)) {
                    //     ctx.$router.push('/')
                    // } else {
                    //     ctx.$router.push(tab.fullPath)
                    // }
                    // store.dispatch('tabs/removeTabs', tab)
                },
                handleRoute = (nRoute, oRoute) => {
                    const _nRoute = nRoute,
                        _oRoute = oRoute;
                    if(!_oRoute || (_oRoute && _nRoute.fullPath != _oRoute.fullPath)) {
                        if(!routesWhiteList.includes(_nRoute.fullPath)) {// 路由不在白名单中，存储在state中
                            let tab = {
                                url: _nRoute.path,
                                fullPath: _nRoute.path,
                                title: _nRoute.meta.title,
                                meta: {
                                    query: formatQueryString(_nRoute.query),
                                    catch: _nRoute.meta.cache
                                }
                            }
                           
                            store.dispatch('tabs/addTabs', tab)
                        }
                    }
                },
                aaaa = () => {
                    console.log(123)
                };
            watch(() => proxy.$router.currentRoute.value, (nRoute, oRoute) => {
                handleRoute(nRoute, oRoute)
            }, {
                immediate: true// 立即监听路由变化
            })
            return {
                tabs,
                isActive,
                openMenu,
                closeSelectedTag,
                aaaa
            }
        }
    });
</script>
<style lang="stylus" scoped>
    @import './../../assets/stylus/reset'
    .tags-view-container {
        .tags-view-wrapper {
            width(100%)
            height(41px)
            background(#fff)
            border-bottom: 1px solid #d8dce5
            .tags-view-item {
                display(inline-block)
                margin-top(7px)
                margin-left(5px)
                position(relative)
                height(26px)
                line-height(21px)
                border: 1px solid #d8dce5
                font-color(#495060)
                background(#fff)
                padding-l-r(8px)
                font-size(12px)
                .el-icon-close {
                    display(inline-block)
                    width(16px)
                    height(16px)
                    vertical-align: 2px
                    border-radius(50%)
                    text-align(center)
                    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)
                    transform-origin: 100% 50%
                    &:before {
                        transform: scale(0.6)
                        display(inline-block)
                        vertical-align: -2px
                    }
                    &:hover {
                        background(#b4bccc)
                        font-color(#fff)
                    }
                }
                &:first-of-type {
                    margin-left(0)
                }
                &.active {
                    background(#42b983)
                    font-color(#fff)
                    border-color: #42b983
                    &:before {
                        margin-right(2px)
                        content: ''
                        background(#fff)
                        display(inline-block)
                        width(8px)
                        height(8px)
                        border-radius(50%)
                        position(relative)
                    }
                }
            }
        }
    }
</style>



