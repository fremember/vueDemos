<!--
 * @Author: fremember
 * @Date: 2021-04-26 12:04:56
 * @Description: 已打开路由的tabs
-->
<template>
    <div class="tags-view-container">
        <scroll-pane ref="scrollPane" class="tags-view-wrapper">
            <router-link
                v-for="tab in tabs" :key="tab.url"
                class="cur-p tags-view-item"
                :class="{
                    'active': isActive(tab),
                    'no-close': (tab.url === '/dashboard' || tab.url === '/dashboard/index')
                }"
                ref="tag"
                :to="tab.url"
            >
                {{ tab.title }}
                <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tab)" />
            </router-link>
        </scroll-pane>
    </div>
</template>
<script lang="ts">
    import { ref, watch, computed, defineComponent, getCurrentInstance } from 'vue'
    import { RouteRecordRaw, useRoute } from 'vue-router'
    import { useStore } from 'vuex'

    import router from '@/router'
    import { TabItem } from '@/interface/common'
    import ScrollPane from './../scrollPane/index.vue'


    import config from '@/config'
    const { setting: { routeWhiteList } } = config
    // import { formatQueryString } from './../../util/tool'


    export default defineComponent({
        name: 'SubNav',
        components: { ScrollPane },
        setup () {
            let store = useStore(),
                route = useRoute(),
                activeIndex = ref(0),


                
                tabs = computed(() => store.getters['tabs/tabs']),
                routes = computed(() => store.getters['routes/routes']),
                isActive = (item: TabItem): boolean => {
                    return item.url === route.path
                },
                closeSelectedTag = (tab: any): void => {
                    if (isActive(tab)) {// 关闭当前路由，跳转到首页
                        router.push('/dashboard/index')
                    }
                    // 删除需要删除的tab
                    store.dispatch('tabs/removeTabs', tab.url)
                },
                getTitleFromRoutes = (nRoute: string, routes: Array<any>): string => {
                    let _title: string = ''
                    routes.forEach((route: any): void => {
                        if(!_title) {
                            if(route.url === nRoute) {
                                _title = route.title
                            } else {
                                if(route.children && route.children.length > 0) {
                                    _title = getTitleFromRoutes(nRoute, route.children)
                                }
                            }
                        }
                    })
                    return _title
                },
                handleRoute = (nRoute: string, oRoute?: string | undefined): void => {
                    const _nRoute: string = nRoute,
                        _oRoute: string | undefined = oRoute;
                    if(_nRoute !== '/dashboard/index' && _oRoute !== '/dashboard') {
                        if(!_oRoute || (_oRoute && _nRoute != _oRoute)) {
                            if(!routeWhiteList.includes(_nRoute)) {// 路由不在白名单中，存储在state中
                                let tab: TabItem = {
                                    url: nRoute,
                                    title: getTitleFromRoutes(nRoute, routes.value)
                                }
                                store.dispatch('tabs/setTabs', tab)
                            }
                        }
                    }
                };
            watch(
                () => route.path,
                (newVal: any, oldVal?: any): void => {
                    handleRoute(newVal, oldVal)
                },
                {
                    immediate: true// 立即监听路由变化
                }
            )
            return {
                activeIndex,
                tabs,
                isActive,
                closeSelectedTag
            }
        }
    });
</script>
<style lang="stylus" scoped>
    @import './../../assets/stylus/reset'
    .tags-view-container {
        height(40px)
        .tags-view-wrapper {
            padding-l-r(16px)
            width(100%)
            height(41px)
            background(#fff)
            border: 1px solid #d8dce5
            .tags-view-item {
                display(inline-block)
                margin-top(7px)
                margin-left(5px)
                padding-right(32px)
                padding-left(8px)
                position(relative)
                height(26px)
                line-height(26px)
                border: 1px solid #d8dce5
                font-color(#495060)
                background(#fff)
                font-size(12px)
                .el-icon-close {
                    position(absolute)
                    top(50%)
                    right(8px)
                    transform: translateY(-50%)
                    width(16px)
                    height(16px)
                    vertical-align: 2px
                    border-radius(50%)
                    text-align(center)
                    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)
                    transform-origin: 100% 50%
                    &:before,
                    &:after {
                        content: ''
                        position(absolute)
                        top(50%)
                        left(50%)
                        display(block)
                        width(12px)
                        height(1px)
                        background(#666)
                    }
                    &:before {
                        transform: translate(-50%, -50%) rotate(45deg)
                    }
                    &:after {
                        transform: translate(-50%, -50%) rotate(-45deg)
                    }
                    &:hover {
                        background(#b4bccc)
                        &:before,
                        &:after {
                            background(#fff)
                        }
                    }
                }
                &:hover {
                    .el-icon-close {
                        display(inline-block)
                    }
                }
                &:first-of-type {
                    margin-left(16px)
                }
                &.active {
                    background(#1890ff)
                    font-color(#fff)
                    border-color: #1890ff
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
                    .el-icon-close {
                        &:before,
                        &:after {
                            background(#fff)
                        }
                    }
                }
                &.no-close {
                    padding-right(8px)
                    .el-icon-close {
                        display(none)
                    }
                }
            }
        }
    }
</style>



