/*
 * @Author: fremember
 * @Date: 2021-05-14 17:51:22
 * @Description: axios配置
 */
import axios, { AxiosRequestConfig } from 'axios'
import store from '@/store'

import config from '@/config'
import Storage from '@/utils/storage'
const storage = new Storage(),
    { setting: { requestWhiteList } } = config,
    qs = require('qs');

let api: string = ''
if (window.location.href.indexOf('1314') > 0) {
    api = '/api'
} else {
    api = '/'
}

export class Pxyaxios {
    // 通用选项
    private static commonOptions: any = {
        responseType: 'json',
        timeout: 5000
    }
    // 设置headers
    private static setHeaders(options: any = {}) {
        if (!options['headers']) {
            options['headers'] = {};
        }
        // 设置默认请求头内容类型
        if (options.method === 'POST') {
            if (!options['headers']['Content-Type']) {
                options['headers']['Content-Type'] = 'application/json; charset=UTF-8';
            }
        }
        const token: string = store.getters['login/token'] || storage.getStorage('token', 1),
            _whiteList: Array<string> = requestWhiteList.map((item: string): string => `${api}${item}`)

        if (!!token && !_whiteList.includes(options.url)) {// 设置token
            options['headers']['token'] = token
        }
        return options
    }
    public static async invoke<T>(
        options: AxiosRequestConfig
    ): Promise<T> {
        if (!options) return Promise.reject('axios请求参数配置不可以为空')

        options = Pxyaxios.setHeaders(options)

        let method = options.method || 'GET',
            instance = axios.create(Pxyaxios.commonOptions);

        // 请求拦截器
        instance.interceptors.request.use(
            (request: any): any => {
                if (request.url.indexOf('/common/getImgVerify') < 0) {
                    store.dispatch('common/setLoading', true)
                }
                if (method === 'POST') {
                    request.data = JSON.stringify(request.data);
                }
                if (method == 'GET') {
                    request.url = `${request.url}?${qs.stringify(request.data)}`
                }
                return request;
            },
            (err: any): any => {
                return Promise.reject(err);
            }
        );

        // 响应拦截器
        instance.interceptors.response.use(
            (response: any): any => {
                store.dispatch('common/setLoading', false)
                return response;
            },
            (err: any): any => {
                let result = err;
                // 取消处理
                if (err instanceof axios.Cancel) {
                    result = ''; // 返回空时，Prompt不提示
                }
                // 网络异常处理
                const errMsg = err.message || '';
                if (errMsg.indexOf('Network Error') > -1) {
                    result = '系统繁忙，请稍后重试';
                } else if (errMsg.indexOf('timeout of') > -1) {
                    result = '系统繁忙，请稍后重试';
                }
                store.dispatch('common/setLoading', false)
                return Promise.reject(result);
            }
        );

        let response = await instance.request(options)
        if (response.data.code === 0) {// 正确的数据
            return response.data.data
        } else {// 报错信息
            return response.data.msg
        }
    }
    // GET方法请求
    public static async get<T>(
        options: AxiosRequestConfig
    ): Promise<T> {
        if (!options) return Promise.reject('axios配置参数不可以为空');
        options['method'] = 'GET';
        return await Pxyaxios.invoke<T>(options);
    }

    // POST方法请求
    public static async post<T>(
        options: AxiosRequestConfig
    ): Promise<T> {
        if (!options) return Promise.reject('axios配置参数不可以为空');
        options['method'] = 'POST';
        return await Pxyaxios.invoke<T>(options);
    }
}
