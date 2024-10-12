import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

/**
 * axios的二次封装
 */
const service: AxiosInstance = axios.create({
    baseURL: '/api'
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
    config['headers']['Content-Type'] = 'application/json; charset=UTF-8';
    return config
}, (err: AxiosError) => {
    return Promise.reject(err)
})

service.interceptors.response.use((response: AxiosResponse) => {
    return response.request.responseType == 'blob' ? response.data : response.data.data
}, (err: AxiosError) => {
    return Promise.reject(err)
})

export default service