/*
 * @Author: fremember
 * @Date: 2021-06-16 10:20:23
 * @Description: 
 */
let state = {
        loading: false,
        refresh: false
    },
    getters = {
        loading: (state) => state.loading,
        refresh: (state) => state.refresh
    },
    mutations = {
        setLoading (state, loading) {
            state.loading = loading
        },
        setRefresh (state, refresh) {
            state.refresh = refresh
        }
    },
    actions = {
        setLoading ({ commit }, loading) {// 设置loading
            commit('setLoading', loading)
        },
        setRefresh ({ commit }, refresh) {// 重新刷新当前页面数据
            commit('setRefresh', refresh)
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