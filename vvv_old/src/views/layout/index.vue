<!--
 * @Author: fremember
 * @Date: 2021-06-15 11:00:28
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
                                <a-menu class="tac">
                                    <a-menu-item>
                                        <a href="javascript:;">个人中心</a>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <a href="javascript:;" @click="modify">修改密码</a>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <a href="javascript:;" @click="logout">退出</a>
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </li>
                </ul>
                <div class="tab-nav">
                    <sub-nav />
                </div>
            </a-layout-header>
            <a-layout-content :style="{ margin: '10px', padding: '10px', background: '#fff', minHeight: '280px' }">
                <router-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script type="text/ecmascript-6">
    import {
        MenuUnfoldOutlined,
        MenuFoldOutlined,
        DownOutlined
    } from '@ant-design/icons-vue'
    import { ref, computed } from 'vue'
    import { useStore }  from 'vuex'
    import { useRouter } from 'vue-router'
    import Sider from './sider/index.vue'
    import SubNav from '@/components/subNav/index.vue'
    export default {
        name: 'Login',
        components: { Sider, SubNav, MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined },
        setup () {
            let store = useStore(),
                router = useRouter(),
                username = computed(() => store.getters['user/username']),
                selectedKeys = ref(['1']),
                collapsed = ref(false),
                modify = () => {
                    router.push("/modify")
                },
                logout = () => {
                    store.dispatch('user/logout');
                };
            return {
                username,
                selectedKeys,
                collapsed,
                modify,
                logout
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