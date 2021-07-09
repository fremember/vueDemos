/*
 * @Author: fremember
 * @Date: 2021-06-16 14:19:59
 * @Description: user
 */
import { checkUsername, register, login, updatePwd, logout } from '@/api/user.js'
import router from '@/router'
import { setStorage, clearStorage } from '@/util/accessToken.js'
import commonSettings from '@/config'

import { message } from 'ant-design-vue'


let { prefix } = commonSettings,
    state = {
        accessToken: false,
        rolename: '',
        username: ''
    },
    getters = {
        accessToken: (state) => state.accessToken,
        rolename: (state) => state.rolename,
        username: (state) => state.username
    },
    mutations = {
        setAccessToken(state, accessToken) {
            state.accessToken = accessToken
        },
        setRolename(state, rolename) {
            state.rolename = rolename
        },
        setUsername(state, username) {
            state.username = username
        },
    },
    actions = {
        setAccessToken({ commit }, accessToken) {// 设置accessToken
            commit('setAccessToken', accessToken)
        },
        setRolename({ commit }, rolename) {// 设置rolename
            commit('setRolename', rolename)
        },
        setUsername ({ commit }, username) {
            commit('setUsername', username)
        },
        checkUsername ({ commit }, params) {
            checkUsername(params)
            .then(res => {
                let { code, msg } = res
                if (code == 0) {
                    message.success(msg)
                } else {
                    message.error(msg)
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        register ({ commit }, data) {
            register(data)
            .then(res => {
                let { code, msg } = res
                if(code == 0) {
                    message.success(msg)
                    router.push({ path: '/login' })
                } else {
                    message.error(msg)
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        login ({ commit, dispatch }, data) {
            login(data)
            .then(res => {
                let { code, msg } = res
                if(code == 0) {
                    let { token, rolename, username } = res.data
                    dispatch('setAccessToken', token)
                    dispatch('setRolename', rolename)
                    dispatch('setUsername', username)
                    setStorage(`${prefix}token`, token, 1)
                    setStorage(`${prefix}rolename`, rolename, 1)
                    setStorage(`${prefix}username`, username, 1)
                    message.success(msg)

                    router.push({ path: '/user' })
                } else {
                    message.error(msg)
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        updatePwd({ commit }, data) {
            updatePwd(data)
            .then(res => {
                let { code, msg } = res
                if (code == 0) {
                    message.success(msg)

                    dispatch('setAccessToken', '')
                    dispatch('setRolename', '')
                    dispatch('setUsername', '')
                    clearStorage(1)


                    router.push({ path: '/login' })
                } else {
                    message.error(msg)
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        logout ({ commit, dispatch }) {
            logout()
            .then(res => {
                let { code, msg } = res
                if (code == 0) {

                    dispatch('setAccessToken', '')
                    dispatch('setRolename', '')
                    dispatch('setUsername', '')
                    clearStorage(1)

                    router.push({ path: '/login' })
                    message.success(msg)
                } else {
                    message.error(msg)
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    user = {
        namespaced: true,
        state,
        getters,
        mutations,
        actions
    };
export default user