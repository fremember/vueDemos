/*
 * @Author: fremember
 * @Date: 2021-10-05 09:49:41
 * @Description: 接口获取可用路由
 */
import { GetterTree } from 'vuex'
import router from '@/router'

import { ActionContext } from '@/interface/common'
import { message } from 'ant-design-vue'

import CommonService from '@/api/common'

const commonService = new CommonService()

interface State {
    routes: Array<string>
}
interface Mutations {
    setRoutes: (state: State, routes: Array<string>) => void
}
interface Actions {
    setRoutes: (context: ActionContext, routes: Array<string>) => Promise<void>
}
const state: State = {
        routes: []
    },
    getters: GetterTree<State, any> = {
        routes: (state: State) => state.routes
    },
    mutations: Mutations = {
        setRoutes (state: State, routes: Array<any>): void {
            state.routes = routes
        }
    },
    actions: Actions = {
        async setRoutes (context: ActionContext, data: any): Promise<any> {
            const { commit } = context
            try {
                let result: Array<any> = await commonService.getRoutes(data)
                commit('setRoutes', result)
                return result
            } catch (err) {
                return Promise.reject(err)
            }
        }
    },
    routes = {
        namespaced: true,
        state,
        getters,
        mutations,
        actions
    };
export default routes
