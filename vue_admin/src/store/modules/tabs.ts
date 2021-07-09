/*
 * @Author: fremember
 * @Date: 2021-05-06 14:28:53
 * @Description: 
 */
import { GetterTree } from 'vuex'
import { ActionContext, UrlItem } from './../../interface/common'

interface State {
    tabs: Array<UrlItem>
}

const state: State = {
        tabs: [
        ]
    },
    getters: GetterTree<State, any> = {
        tabs: (state: State) => state.tabs
    },
    mutations = {
        addTabs (state: State, tab: UrlItem): void {
            let _index = -1
            state.tabs.forEach((v: any, i: number): void => {
                if (v.fullPath === tab.fullPath) {
                    _index = i
                }
            })
            if (_index === -1) {
                state.tabs.push(tab)
            }
        },
        removeTabs (state: State, tab: UrlItem): void {
            state.tabs = state.tabs.filter(item => item.fullPath != tab.fullPath)
        },
        clearTabs (state: State): void {
            state.tabs = state.tabs.filter(item => item.fullPath == '/index')
        },
        clearOtherTabs (state: State, tab: UrlItem): void {
            state.tabs = state.tabs.filter(item => item.fullPath == '/index' || item.fullPath == tab.fullPath)
        }
    },
    actions = {
        addTabs(context: ActionContext, tab: UrlItem): void {// 添加路由tab
            const { commit } = context
            commit('addTabs', tab)
        },
        removeTabs(context: ActionContext, tab: UrlItem): void {// 删除一个路由tab
            const { commit } = context
            commit('removeTabs', tab)
        },
        clearTabs(context: ActionContext): void {// 删除所有的路由tab
            const { commit } = context
            commit('clearTabs')
        },
        clearOtherTabs(context: ActionContext, tab: UrlItem): void {// 删除其他的路由，只保留当前路由和首页路由
            const { commit } = context
            commit('clearOtherTabs', tab)
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