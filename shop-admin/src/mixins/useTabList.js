import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import cookie from '@/utils/cookie'
import { router } from '@/router'
export function useTagList () {
    const route = useRoute(),
        activeTab = ref(route.path),
        tabList = ref([
            { title: '后台首页', path: '/' }
        ]);
        function addTab(tab) {// 添加标签导航
            // 先判断在不在标签列表中，不存在的时候才添加
            let noTab = tabList.value.findIndex(t => t.path == tab.path) == -1
            if(noTab) {
                tabList.value.push(tab)
            }
            cookie.set('tabList', tabList.value)
        }
        function initTabList() {// 初始化标签导航
            let tabs = cookie.get('tabList')
            if(tabs) {
                tabList.value = tabs
            }
        }
        initTabList()
        onBeforeRouteUpdate((to, from) => {// 路由切换前，添加标签
            activeTab.value = to.path
            addTab({
                title: to.meta.title,
                path: to.path
            })
        })
        function changeTab(t) {// 切换标签导航
            activeTab.value = t
            router.push(t)
        }
        function removeTab (t) {// 删除标签导航
            let tabs = tabList.value,
                a = activeTab.value;
            if(a == t) {// 如果删除的时当前激活状态下的路由地址，则删除后切换成当前标签的上一个或者下一个
                tabs.forEach((tab, index) => {
                    if(tab.path == t) {
                        const nextTab = tab[index + 1] || tabs[index - 1]
                        if(nextTab) {
                            a = nextTab.path
                        }
                    }
                })
            }
            activeTab.value = a
            tabList.value = tabList.value.filter(tab => tab.path != t)
            cookie.set('tabList', tabList.value)
        }
        function handleClose (c) {// 关闭标签（关闭当前、关闭其他）
            if (c == 'clearAll') {
                activeTab.value = '/'
                tabList.value = [{
                    title: '后台首页',
                    path: '/'
                }]
            } else if(c == 'clearOther') {
                tabList.value = tabList.value.filter(t => t.path == '/' || t.path == activeTab.value)
            }
            cookie.set('tabList', tabList.value)
        }
    return {
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleClose
    }
}