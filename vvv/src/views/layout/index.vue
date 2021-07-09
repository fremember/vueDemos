<!--
 * @Author: fremember
 * @Date: 2021-06-28 10:24:20
 * @Description: layui布局页面
-->
<template>
    <a-layout>
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <sider />
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <ul class="flex ai-c jc-s btn-name-wrapper">
                    <li>
                        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
                        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
                    </li>
                    <li class="flex ai-c jc-e flex_1">
                        <img class="avatar" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" alt="">
                        <a-dropdown>
                            <a class="ant-dropdown-link" @click.prevent>
                                {{ username }}
                                <DownOutlined />
                            </a>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item v-for="(menu, index) in menus" :key="index">
                                        <a href="javascript:;" @click="userEvent(index)">
                                            <mine-icon :componentName="menu.componentName" /> {{ menu.title }}
                                        </a>
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </li>
                </ul>
                <div class="flex ai-c jc-s tab-nav">
                    <sub-nav class="flex_1" />
                    <operate />
                </div>
            </a-layout-header>
            <a-layout-content>
                <router-view v-slot="{ Component }">
                    <transition name="fade-transform" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </a-layout-content>
            <a-layout-footer style="text-align: center; padding: 8px;">Created by fremember</a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script type="text/ecmascript-6">
    import { MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined } from '@ant-design/icons-vue'
    import { ref, computed } from 'vue'
    import { useStore }  from 'vuex'
    import { useRouter } from 'vue-router'
    import SubNav from '@/components/subNav/index.vue'
    import Sider from './sider/index.vue'
    import Operate from './operate/index.vue'
    import MineIcon from '@/components/mineIcon/index.vue'
    export default {
        name: 'Login',
        components: { Sider, SubNav, Operate, MineIcon, MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined },
        setup () {
            let store = useStore(),
                router = useRouter(),
                username = computed(() => store.getters['user/username']),
                collapsed = ref(false),
                menus = ref([
                    { title: '个人资料', componentName: 'IdcardOutlined' },
                    { title: '修改密码', componentName: 'EditOutlined' },
                    { title: '系统公告', componentName: 'SoundOutlined' },
                    { title: '功能设置', componentName: 'SettingOutlined' },
                    { title: '更换皮肤', componentName: 'SkinOutlined' },
                    { title: '退出', componentName: 'PoweroffOutlined' },
                ]),
                userEvent = (index) => {
                    index == 0 && router.push("/user/info")
                    index == 1 && router.push("/modify")

                    // 2、3、4需要修改
                    index == 2 && store.dispatch('user/logout')
                    index == 3 && router.push("/modify")
                    index == 4 && store.dispatch('user/logout')



                    index == 5 && store.dispatch('user/logout')
                };
            return {
                username,
                collapsed,
                menus,
                userEvent
            }
        }
    }
    
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../assets/stylus/reset'
    .ant-layout {
        height: 100vh;
        .avatar {
            margin-right(10px)
            width(40px)
            height(40px)
            border-radius(50%)
        }
    }
    #components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }

    

    .site-layout .site-layout-background {
        background: #fff;
    }
    .ant-layout-header {
        padding: 0 !important;
        height: 90px;
    }
    .ant-layout-content {
        margin: 10px;
        padding: 10px;
        background: #fff;
        height: calc(100vh - 120px);
        overflow-y: auto
    }
    .btn-name-wrapper {
        margin-bottom: 0;
        padding: 0 10px;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #f0f0f0;
    }
    .tab-nav {
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
    }
</style>