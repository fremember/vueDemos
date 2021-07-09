/*
 * @Author: fremember
 * @Date: 2021-05-14 17:51:22
 * @Description: axios配置
 */
import axios, { AxiosRequestConfig } from 'axios'
import store from './../store/index'


export class Pxyaxios {
    // 通用选项
    private static commonOptions: any = {
        responseType: 'json',
        timeout: 20000
    }

    // 设置headers
    private static setHeaders(options: any = {}) {
        if (!options['headers']) {
            options['headers'] = {}
        }
        // 设置默认请求头内容类型
        if (options.method === 'POST') {
            if (!options['headers']['Content-Type']) {
                options['headers']['Content-Type'] = 'application/json; charset=UTF-8'
            }
        }
        // 处理token

        return options
    }

    public static setLoading(loading: boolean): void {
        store.commit('common/setLoading', loading)
    }

    // axios调用
    public static async invoke<T>(
        options: AxiosRequestConfig
    ): Promise<T> {
        if (!options) return Promise.reject('axios配置参数不可以为空')
        Pxyaxios.setLoading(true)

        options = Pxyaxios.setHeaders(options)
        // const method: string = options.method || 'GET',
        //     instance = axios.create(Pxyaxios.commonOptions)
        const instance = axios.create(Pxyaxios.commonOptions)
        
        instance.interceptors.request.use(
            request => {
                return request
            },
            error => {
                Pxyaxios.setLoading(false)
                return Promise.reject(error)
            }
        )

        instance.interceptors.response.use(
            response => {
                Pxyaxios.setLoading(false)
                console.log(response)
                return response
                // if(response.data)
            }
        )
    }

    // GET方法请求
    public static async get<T> (
        options: AxiosRequestConfig
    ): Promise<T> {
        if (!options) return Promise.reject('axios配置参数不可以为空')
        options['method'] = 'GET'
        return await Pxyaxios.invoke<T>(options)
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