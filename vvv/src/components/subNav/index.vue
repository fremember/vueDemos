<!--
 * @Author: fremember
 * @Date: 2021-06-28 16:00:40
 * @Description: 已打开路由的tabs
-->
<template>
    <div class="tags-view-container">
        <scroll-pane class="tags-view-wrapper">
            <router-link
                class="cur-p tags-view-item"
                :class="isActive(item) ? 'active' : ''"
                ref="tag"
                :to="item.fullPath"
                v-for="(item, index) in tabs" :key="index">
                <span class="pos-r tag-item-text">{{ item.title }}</span>
                <span class="el-icon-close" v-if="item.fullPath != '/dashboard/index'" @click.prevent.stop="closeSelectedTag(item)" />
            </router-link>
        </scroll-pane>
    </div>
</template>
<script type="text/ecmascript-6">
    import { defineComponent, getCurrentInstance, computed, watch } from 'vue'
    import { mapGetters, useStore } from 'vuex'
    import ScrollPane from './../scrollPane/index.vue'
    import { formatQueryString } from '@/util/common'
    import commonSettings from '@/config'
    let { routesWhiteList } = commonSettings
    const padding = 15
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
                closeSelectedTag = (tab) => {
                    if (isActive(tab)) {
                        proxy.$router.push('/dashboard')
                    } else {
                        proxy.$router.push(tab.fullPath)
                    }
                    store.dispatch('tabs/removeTabs', tab)
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
                                    catch: _nRoute.meta.cache,
                                    icon: _nRoute.meta.icon
                                }
                            }
                            store.dispatch('tabs/addTabs', tab)
                        }
                    }
                };
            watch(() => proxy.$router.currentRoute.value, (nRoute, oRoute) => {
                handleRoute(nRoute, oRoute)
            }, {
                immediate: true// 立即监听路由变化
            })
            return {
                tabs,
                isActive,
                closeSelectedTag
            }
        }
    })
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../assets/stylus/reset'
    .tags-view-container {
        .tags-view-wrapper {
            width(100%)
            height(40px)
            background(#fff)
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
                .tag-item-text {
                    top(-1px)
                }
                .el-icon-close {
                    position(relative)
                    top(4px)
                    display(inline-block)
                    margin-left(2px)
                    width(16px)
                    height(16px)
                    vertical-align: 2px
                    border-radius(50%)
                    text-align(center)
                    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)
                    transform-origin: 100% 50%
                    &:before, &:after {
                        content: ''
                        position(absolute)
                        top(50%)
                        left(50%)
                        display(inline-block)
                        width(12px)
                        height(1px)
                        background(#b4bccc)
                    }
                    &:before {
                        transform: translate(-50%, -50%) rotate(45deg)
                    }
                    &:after {
                        transform: translate(-50%, -50%) rotate(-45deg)
                    }
                    &:hover {
                        background(#b4bccc)
                        font-color(#fff)
                        &:before, &:after {
                            background(#fff)
                        }
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
                        top(-1px)
                    }
                }
            }
        }
    }
</style>