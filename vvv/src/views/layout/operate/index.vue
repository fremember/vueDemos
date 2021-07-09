<!--
 * @Author: fremember
 * @Date: 2021-06-28 20:30:31
 * @Description: 页面操作
-->
<template>
    <a-dropdown class="tac operate">
        <a @click.prevent href="javascript:;">
            <mine-icon componentName="AimOutlined" />
            页面操作
            <DownOutlined />
        </a>
        <template #overlay>
            <a-menu class="tac">
                <a-menu-item v-for="(menu, index) in menus" :key="index">
                    <a href="javascript:;" @click="optEvent(index, menu)">
                        <mine-icon :componentName="menu.componentName" /> {{ menu.title }}
                    </a>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>
<script type="text/ecmascript-6">
    import { MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined } from '@ant-design/icons-vue'
    import MineIcon from '@/components/mineIcon/index.vue'
    import { ref, getCurrentInstance } from 'vue'
    import { useStore } from 'vuex'
    export default {
        name: 'Operate',
        components: { MineIcon, MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined },
        setup () {
            let { proxy } = getCurrentInstance(),
                store = useStore(),
                menus = ref([
                    { title: '刷新当前', componentName: 'SyncOutlined' },
                    { title: '关闭其他', componentName: 'CloseCircleOutlined' },
                    { title: '关闭全部', componentName: 'CloseOutlined' }
                ]),
                optEvent = (index, menu) => {
                    index == 0 && store.dispatch('common/setRefresh', true)
                    index == 1 && store.dispatch('tabs/clearOtherTabs', { fullPath: proxy.$router.currentRoute.value.fullPath })
                    index == 2 && store.dispatch('tabs/clearTabs')
                };
            return {
                menus,
                optEvent
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../assets/stylus/reset'
    .operate {
        margin-left(10px)
        width(100px)
    }
</style>