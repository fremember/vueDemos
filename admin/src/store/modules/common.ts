/*
 * @Author: fremember
 * @Date: 2021-09-15 17:48:34
 * @Description: loading状态管理
 */
import { GetterTree } from 'vuex'
import router from '@/router'



import { ActionContext, LoginForm } from '@/interface/common'

import { message } from 'ant-design-vue'

import CommonService from '@/api/common'
import Storage from '@/utils/storage'

const commonService = new CommonService(),
    storage = new Storage();

interface State {
    loading: boolean;
    validateCodeSvg: any;
    username: string;
    avatar: string;
}

const state = {
        loading: false,
        validateCodeSvg: null,
        username: '',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    },
    getters: GetterTree<State, any> = {
        loading: (state: State) => state.loading,
        validateCodeSvg: (state: State) => state.validateCodeSvg,
        username: (state: State) => state.username,
        avatar: (state: State) => state.avatar,
    },
    mutations = {
        setLoading (state: State, loading: boolean): void {
            state.loading = loading
        },
        setValidateCodeSvg (state: State, validateCodeSvg: any): void {
            state.validateCodeSvg = validateCodeSvg
        },
        setUsername (state: State, username: string): void {
            state.username = username
        },
        setAvatar(state: State, avatar?: string): void {
            if(avatar) {
                state.avatar = avatar
            }
        }
    },
    actions = {
        setLoading (context: ActionContext, loading: boolean): void {
            const { commit } = context
            commit('setLoading', loading)
        },
        async setValidateCodeSvg(context: ActionContext, data: any): Promise<void> {
            const { commit } = context
            try {
                let result: any = await commonService.captcha(data)
                commit('setValidateCodeSvg', result)
            } catch (err) {
                commit('setValidateCodeSvg', null)
                return Promise.reject(err)
            }
        },
        async login (context: ActionContext, data: LoginForm): Promise<void> {
            try {
                let result: any = await commonService.login(data)
                if(result.token) {// 登录成功，保存token，跳转路由
                    storage.setStorage('token', result.token, 1)
                    storage.setStorage('rolename', result.rolename, 1)

                    storage.setStorage('username', result.username, 1)
                    storage.setStorage('avatar', result.avatar || '', 1)

                    const { commit } = context
                    commit('setUsername', result.username)
                    commit('setAvatar', result.avatar)

                    if (router.currentRoute.value.query && router.currentRoute.value.query.redirect) {
                        let _query: any = router.currentRoute.value.query,
                            _path: string = _query.redirect || '';
                        router.push({ path: _path })
                    } else {
                        router.push({ path: '/dashboard' })
                    }
                } else {// 登录失败
                    message.warning(result)
                }
            } catch (err) {
                return Promise.reject(err)
            }
        },
        async register (context: ActionContext, data: any): Promise<void> {
            try {
                let result: any = await commonService.register(data)
                if( result ) {// 注册成功
                    router.push({ path: '/login' })
                } else {// 注册失败
                    message.warning(result)
                }
            } catch (err) {
                return Promise.reject(err)
            }
        },
        async logout (context: ActionContext): Promise<void> {
            try {
                let result: any = await commonService.logout()
                if (result) {
                    router.push({ path: '/login' })
                    storage.clearStorage(1)
                    storage.clearStorage(2)
                }
            } catch (err) {
                return Promise.reject(err)
            }
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