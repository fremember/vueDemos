/*
 * @Author: fremember
 * @Date: 2021-06-16 10:20:23
 * @Description: 
 */
let state = {
        loading: false
    },
    getters = {
        loading: (state) => state.loading
    },
    mutations = {
        setLoading(state, loading) {
            state.loading = loading
        }
    },
    actions = {
        setLoading({ commit }, loading) {// 设置loading
            commit('setLoading', loading)
        },
    },
    common = {
        namespaced: true,
        state,
        getters,
        mutations,
        actions
    };
export default common