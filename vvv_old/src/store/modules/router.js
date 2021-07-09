/*
 * @Author: fremember
 * @Date: 2021-06-24 18:24:13
 * @Description: 用户登录的时候处理路由
 */

import { asyncRoutes } from '@/router'
import { filterRoutes } from '@/util/routes'

let state = {
        routes: []
    },
    getters = {
        routes: (state) => state.routes
    },
    mutations = {
        setRoutes (state, routes) {
            state.routes = routes
        }
    },
    actions = {
        setRoutes ({ commit }, rolename) {
            commit('setRoutes', filterRoutes(asyncRoutes, rolename))
        }
    },
    router = {
        namespaced: true,
        state,
        getters,
        mutations,
        actions
    };
export default router