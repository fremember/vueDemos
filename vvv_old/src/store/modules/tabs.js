/*
 * @Author: fremember
 * @Date: 2021-06-24 08:50:12
 * @Description: 已打开的标签
 */

let state = {
        tabs: []
    },
    getters = {
        tabs: (state) => state.tabs
    },
    mutations = {
        addTabs (state, tab) {
            let _index = -1
            state.tabs.forEach((v, i) => {
                if (v.fullPath === tab.fullPath) {
                    _index = i
                }
            })
            if (_index === -1) {
                state.tabs.push(tab)
            }
        },
        removeTabs(state, tab) {
            state.tabs = state.tabs.filter(item => item.fullPath != tab.fullPath)
        },
        clearTabs(state) {
            state.tabs = state.tabs.filter(item => item.fullPath == '/index')
        },
        clearOtherTabs(state, tab) {
            state.tabs = state.tabs.filter(item => item.fullPath == '/index' || item.fullPath == tab.fullPath)
        }
    },
    actions = {
        addTabs({ commit }, tab) {// 添加路由tab
            commit('addTabs', tab)
        },
        removeTabs({ commit }, tab) {// 删除一个路由tab
            commit('removeTabs', tab)
        },
        clearTabs({ commit }) {// 删除所有的路由tab
            commit('clearTabs')
        },
        clearOtherTabs({ commit }, tab) {// 删除其他的路由，只保留当前路由和首页路由
            commit('clearOtherTabs', tab)
        }
    },
    common = {
        namespaced: true,
        state,
        getters,
        mutations,
        actions
    };
export default common