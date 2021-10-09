<!--
 * @Author: fremember
 * @Date: 2021-09-15 17:12:41
 * @Description: 布局页面
-->
<template>
    <a-layout class="pxy-layout">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <div class="colorfff flex-center pxy-layout-logo">admin</div>
            <layout-menu />
        </a-layout-sider> 
        <a-layout>
            <a-layout-header class="pxy-layout-header">
                <div class="flex ai-c jc-s pxy-layout-header-info">
                    <div>
                        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)"/>
                        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
                    </div>
                    <div class="flex ai-c pxy-layout-header-cont">
                        <img class="pxy-layout-header-cont-avatar" :src="avatar" alt="">
                        <a-dropdown>
                            <a class="ant-dropdown-link" @click.prevent>
                                {{ username }}
                                <DownOutlined />
                            </a>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item>
                                        <span @click="dropdownEvent(1)">个人中心</span>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <span @click="dropdownEvent(2)">修改密码</span>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <span @click="dropdownEvent(3)">退出</span>
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                </div>
                <!-- <div class="pay-layout-header-wrapper">hshsh</div> -->
                <sub-nav />
            </a-layout-header>
            <a-layout-content class="pxy-layout-content">
                <router-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script lang="ts">
    import { defineComponent, ref, computed } from 'vue'
    import { useStore } from 'vuex'
    import LayoutMenu from './layoutMenu/index.vue'
    import SubNav from '@/components/subNav/index.vue'

    import {
        MenuUnfoldOutlined,
        MenuFoldOutlined,
        DownOutlined
    } from '@ant-design/icons-vue'

    export default defineComponent({
        name: 'Layout',
        components: {
            LayoutMenu,
            SubNav,
            MenuUnfoldOutlined,
            MenuFoldOutlined,
            DownOutlined
        },
        setup() {
            let store = useStore(),
                username = computed(() => store.getters['common/username']),
                avatar = computed(() => store.getters['common/avatar']),
                dropdownEvent = (index: number): void => {
                    console.log(index)
                    switch (index) {
                        case 1:
                            break
                        case 2:
                            break
                        case 3:
                            store.dispatch('common/logout')
                            break
                    }
                };
            return {
                collapsed: ref<boolean>(false),
                username,
                avatar,
                dropdownEvent
            }
        }
    });
</script>
<style scoped lang="stylus">
    @import './../../assets/stylus/reset'
    .pxy-layout {
        height(100vh)
        &-logo {
            height(50px)
        }
        &-header {
            &-cont {
                &-avatar {
                    margin-right(10px)
                    width(40px)
                    height(40px)
                    border-radius(50%)
                }
            }
        }
    }
</style>