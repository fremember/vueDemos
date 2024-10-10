import axios from 'axios'
import store from '@/store'

import { notification } from './element-plus.js'
import cookie from './cookie.js'
import { ajaxWhiteList } from './config.js'
import { delQueryFromUrl } from './lib.js'

const service = axios.create({
    baseURL: '/api'
})

service.interceptors.request.use((config) => {
    const token = cookie.get('token'),
        _url = delQueryFromUrl(config.url);
    if (token && !ajaxWhiteList.includes(_url)) {
        config.headers['token'] = token
    }
    return config
}, (err) => {
    return Promise.reject(err)
})

service.interceptors.response.use((response) => {
    return response.request.responseType == 'blob' ? response.data : response.data.data
}, (err) => {

    const msg = err.response.data.msg || '请求失败'
   
    if (msg == '非法token，请先登录！') {
        store.dispatch('manager/logout').finally(() => location.reload())
    }
    notification({
        message: msg,
        type: 'error'
    })
    return Promise.reject(err)
})

export default service

