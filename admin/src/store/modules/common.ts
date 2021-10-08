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
    validateCodeSvg: any
}

const state = {
        loading: false,
        validateCodeSvg: null
    },
    getters: GetterTree<State, any> = {
        loading: (state: State) => state.loading,
        validateCodeSvg: (state: State) => state.validateCodeSvg
    },
    mutations = {
        setLoading (state: State, loading: boolean): void {
            state.loading = loading
        },
        setValidateCodeSvg (state: State, validateCodeSvg: any) {
            state.validateCodeSvg = validateCodeSvg
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