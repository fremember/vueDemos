/*
 * @Author: fremember
 * @Date: 2021-10-08 17:57:20
 * @Description: 打开的标签项
 */
import { GetterTree } from 'vuex'
import router from '@/router'

import { ActionContext, TabItem } from '@/interface/common'

interface State {
    tabs: Array<TabItem>;
}
interface Mutations {
    setTabs: (state: State, tabs: TabItem) => void;
    removeTabs: (state: State, tabs: string) => void
}
interface Actions {
    setTabs: (context: ActionContext, tabs: TabItem) => Promise<void>;
    removeTabs: (context: ActionContext, tabs: string) => Promise<void>;
}
const state: State = {
    tabs: [
        { title: '首页', url: '/dashboard/index' }
    ]
},
    getters: GetterTree<State, any> = {
        tabs: (state: State) => state.tabs
    },
    mutations: Mutations = {
        setTabs(state: State, tabItem: TabItem): void {
            let _index: number = -1
            state.tabs.forEach((v: TabItem, i: number): void => {
                if (v.url === tabItem.url) {
                    _index = i
                }
            })
            if (_index === -1) {
                state.tabs.push(tabItem)
            }
        },
        removeTabs(state: State, url: string): void {
            state.tabs = state.tabs.filter(item => item.url !== url)
        }
    },
    actions: Actions = {
        async setTabs(context: ActionContext, tabItem: TabItem): Promise<any> {
            const { commit } = context
            commit('setTabs', tabItem)
        },
        async removeTabs(context: ActionContext, url: string): Promise<any> {
            const { commit } = context
            commit('removeTabs', url)
        }
    },
    tabs = {
        namespaced: true,
        state,
        getters,
        mutations,
        actions
    };
export default tabs
