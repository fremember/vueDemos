import { login, getInfo, logout, updatePassword } from '@/api/manager.js'
import cookie from '@/utils/cookie.js'

const state = {
        // loading: false,
        userInfo: null,
        menus: [],
        ruleNames: []
    },
    getters = {
        loading: (state) => state.loading,
        userInfo: (state) => state.userInfo,
        menus: (state) => state.menus,
        ruleNames: (state) => state.ruleNames
    },
    mutations = {
        // setLoading (state, loading) {
        //     state.loading = loading
        // },
        setUserInfo (state, userInfo) {
            state.userInfo = userInfo
        },
        setMenus (state, menus) {
            state.menus = menus
        },
        setRuleNames (state, ruleNames) {
            state.ruleNames = ruleNames
        }
    },
    actions = {
        getInfo({ commit }) {// 获取用户信息
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    commit('setUserInfo', res)
                    commit('setMenus', res.menus)
                    commit('setRuleNames', res.ruleNames)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        login({ dispatch }, loginData) {// 登录
            return new Promise((resolve, reject) => {
                login(loginData).then(res => {
                    cookie.set('token', res.token)
                    resolve()
                }).catch(err => reject(err))
            })
        },
        logout ({ commit }) {// 退出登录
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('setUserInfo', null)
                    cookie.remove('token')
                    resolve()
                }).catch(err => reject(err))
            })
        },
        updatePassword({ dispatch }, pwdData) {// 修改密码
            return new Promise((resolve, reject) => {
                updatePassword(pwdData).then(() => {
                    commit('setUserInfo', null)
                    cookie.remove('token')
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        }
    },
    manager = {
        namespaced: true,
        state,
        getters,
        mutations,
        actions
    };

export default manager