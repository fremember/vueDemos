/*
 * @Author: fremember
 * @Date: 2021-06-17 10:35:21
 * @Description: 用户相关操作接口
 */
import service from '@/util/request'

let baseUrl = '/api/user/'

export function checkUsername (params) {
    return service.get(`${baseUrl}checkUsername`, params)
}
export function register (data) {
    return service.post(`${baseUrl}register`, data)
}
export function login (data) {
    return service.post(`${baseUrl}login`, data)
}
export function updatePwd (data) {
    return service.post(`${baseUrl}updatePwd`, data)
}
export function logout () {
    return service.get(`${baseUrl}logout`)
}