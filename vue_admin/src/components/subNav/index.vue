<!--
 * @Author: fremember
 * @Date: 2021-04-26 12:04:56
 * @Description: 已打开路由的tabs
 :class="{'active': activeIndex == index}"
-->
<!-- generated by vue-issues. DO NOT REMOVE -->
<template>
    <div class="tags-view-container">
        <scroll-pane ref="scrollPane" class="tags-view-wrapper">
            <router-link
                class="cur-p tags-view-item"
                :class="isActive(item) ? 'active' : ''"
                ref="tag"
                :to="item.fullPath"
                v-for="(item, index) in tabs" :key="index"
                @contextmenu.prevent="openMenu(tag, $event)">
                {{ item.title }}
                <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(item)" />
            </router-link>
        </scroll-pane>
    </div>
</template>
<script lang="ts">
    import { ref, watch, computed, defineComponent, getCurrentInstance } from 'vue'
    import { RouteRecordRaw } from 'vue-router'
    import { mapGetters, useStore } from 'vuex'
    import { UrlItem } from './../../interface/common'
    import ScrollPane from './../scrollPane/index.vue'
    import { whiteList } from './../../util/config'
    import { formatQueryString } from './../../util/tool'

    // import * as asa from 'vue'
    // console.log(asa)

    export default defineComponent({
        name: 'SubNav',
        components: { ScrollPane },
        setup () {
            let { ctx }: any = getCurrentInstance(),
                store = useStore(),
                activeIndex = ref(0),
                getters = mapGetters('tabs', ['tabs']),
                tabs = computed(getters.tabs.bind({ $store: store })),
                isActive = (item: UrlItem): boolean => {
                    return item.fullPath === ctx.$router.currentRoute.value.fullPath
                },
                openMenu = (item: UrlItem, ev: any): void => {
                    console.log(item)
                    console.log(ev)
                    
                },
                closeSelectedTag = (tab: any): void => {
                    if (isActive(tab)) {
                        ctx.$router.push('/')
                    } else {
                        ctx.$router.push(tab.fullPath)
                    }
                    store.dispatch('tabs/removeTabs', tab)
                },
                handleRoute = (nRoute: RouteRecordRaw, oRoute: RouteRecordRaw): void => {
                    const _nRoute: any = nRoute,
                        _oRoute: any = oRoute;
                    if(!_oRoute || (_oRoute && _nRoute.fullPath != _oRoute.fullPath)) {
                        if(!whiteList.includes(_nRoute.fullPath)) {// 路由不在白名单中，存储在state中
                            let tab: UrlItem = {
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
                };
             watch(() => ctx.$router.currentRoute.value, (nRoute, oRoute) => {
                handleRoute(nRoute, oRoute)
            }, {
                immediate: true// 立即监听路由变化
            })
            return {
                activeIndex,
                tabs,
                isActive,
                openMenu,
                closeSelectedTag
            }
        }
    });
</script>
<style lang="stylus" scoped>
    @import './../../assets/stylus/reset'
    .tags-view-container {
        .tags-view-wrapper {
            padding-l-r(16px)
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
                line-height(26px)
                border: 1px solid #d8dce5
                font-color(#495060)
                background(#fff)
                padding-l-r(8px)
                font-size(12px)
                .el-icon-close {
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
                        background-color: #b4bccc;
                        color: #fff;
                    }
                }
                &:first-of-type {
                    margin-left(16px)
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



