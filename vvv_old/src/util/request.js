/*
 * @Author: fremember
 * @Date: 2021-06-15 11:26:47
 * @Description: asios的封装
 */

import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import router from '@/router'
import { getStorage, clearStorage } from '@/util/accessToken'
import commonSettings from '@/config'

const service = ({ method, url, params, data } = {}) => {
    let _url = method == 'GET' && params ? `${url}?${qs.stringify(params)}` : url;
    return axios(_url, {
        method,
        data
    })
}


axios.interceptors.request.use(config => {
    let { prefix, routesWhiteList } = commonSettings,
        token = getStorage(`${prefix}token`, 1),
        fullPath = router.currentRoute.value.fullPath;
    if (config.url.indexOf('/api/common/getImgVerify') < 0 && config.url.indexOf('/api/user/checkUsername') < 0) {// 获取图形验证码的时候不设置loading的值
        store.commit('common/setLoading', true)
    }
    if (!routesWhiteList.includes(fullPath)) {
        if (token) {
            config.headers['token'] = token;
        }
    }
    return config
})

axios.interceptors.response.use(res => {
    let { data } = res,
        { messageDuration } = commonSettings;

    // 网络好的时候，使用定时器修改loading的值
    // setTimeout(() => {
    //     store.commit('common/setLoading', false)
    // }, messageDuration)
    // 网络不好的时候，直接设置loading的值
    store.commit('common/setLoading', false)


    if (data.code == 200) {
        router.push({
            path: 'login'
        })
    } else {
        return data
    }
})

service.get = (url, params) => service({ method: 'GET', url, params })
service.post = (url, data) => service({ method: 'POST', url, data })

export default service