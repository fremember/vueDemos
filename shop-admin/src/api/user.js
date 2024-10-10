/**
 * 用户管理-列表相关api
 */
import axios from '@/utils/axios'
import { queryParams } from '../utils/lib'

/**
 * 用户列表
 * @param {*} page number
 * @param {*} query 
 * @returns 
 */
export function getUserList(page, query = {}) {
    let r = queryParams(query)
    return axios.get(`/admin/user/${page}${r}`)
}

/**
 * 修改用户状态
 * @param {*} id number 用户ID
 * @param {*} status number 状态：0禁用1启用
 * @returns 
 */
export function updateUserStatus(id, status) {
    return axios.post(`/admin/user/${id}/update_status`, {
        status
    })
}

/**
 * 增加用户
 * @param {*} data object {
 *  username: 用户名,
 *  password: 密码,
 *  status: 状态：0禁用1启用,
 *  nickname: 
 *  phone: 手机号,
 *  email: 邮箱,
 *  avatar: 头像,
 *  user_level_id: 会员等级
 * }
 * @returns 
 */
export function createUser(data) {
    return axios.post(`/admin/user`, data)
}

/**
 * 修改用户信息
 * @param {*} id number 用户id
 * @param {*} data  object {
 *  username: 用户名,
 *  password: 密码,
 *  status: 状态：0禁用1启用,
 *  nickname: 
 *  phone: 手机号,
 *  email: 邮箱,
 *  avatar: 头像,
 *  user_level_id: 会员等级
 * }
 * @returns 
 */
export function updateUser(id,data) {
    return axios.post(`/admin/user/${id}`, data)
}

/**
 * 删除会员
 * @param {*} id number 用户id
 * @returns 
 */
export function deleteUser(id) {
    return axios.post(`/admin/user/${id}/delete`)
}