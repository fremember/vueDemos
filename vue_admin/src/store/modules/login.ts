/*
 * @Author: fremember
 * @Date: 2021-05-17 08:27:51
 * @Description: 
 */
import { GetterTree } from 'vuex'
import { ActionContext } from './../../interface/common'

interface State {
    loading: boolean
}
const state = {
    loading: false
},
    getters: GetterTree<State, any> = {
        loading: (state: State) => state.loading
    },
    mutations = {
        setLoading(state: State, loading: boolean): void {
            state.loading = loading
        }
    },
    actions = {
        setLoading(context: ActionContext, loading: boolean): void {// 设置loading
            const { commit } = context
            commit('setLoading', loading)
        },
    },
    login = {
        namespaced: true,
        state,
        getters,
        mutations,
        actions
    };
export default login