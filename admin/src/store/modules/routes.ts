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

import { TopRoutes } from '@/interface/common'

const commonService = new CommonService()

interface State {
    routes: Array<string>;
    topRoutes: Array<TopRoutes>;
}
interface Mutations {
    setRoutes: (state: State, routes: Array<string>) => void;
    setTopRoutes: (state: State, topRoutes: Array<TopRoutes>) => void;
}
interface Actions {
    setRoutes: (context: ActionContext, routes: Array<string>) => Promise<void>;
    setTopRoutes: (context: ActionContext) => Promise<void>;
    addRoute: (context: ActionContext, route: any) => Promise<any>;
}
const state: State = {
        routes: [],
        topRoutes: []
    },
    getters: GetterTree<State, any> = {
        routes: (state: State) => state.routes,
        topRoutes: (state: State) => state.topRoutes
    },
    mutations: Mutations = {
        setRoutes (state: State, routes: Array<any>): void {
            state.routes = routes
        },
        setTopRoutes (state: State, topRoutes: Array<TopRoutes>): void {
            state.topRoutes = topRoutes
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
        },
        async setTopRoutes (context: ActionContext): Promise<void> {
            const { commit } = context
            try {
                const res: Array<TopRoutes> = await commonService.getParentRoutes()
                commit('setTopRoutes', res)
            } catch(err) {
                return Promise.reject(err)
            }
        },
        async addRoute (context: ActionContext, route: any): Promise<any> {
            try {
                const res: any = await commonService.addRoute(route)
                return res
            } catch(err) {
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
