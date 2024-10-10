import axios from '@/utils/axios.js'
import { queryParams } from '@/utils/lib'

// 登录接口
export function login (loginData) {
    return axios.post('/admin/login', loginData)
    // return axios.post('/shopAdmin/common/login', loginData)
}

// 获取用户信息
export function getInfo () {
    return axios.post('/admin/getInfo')
}
// 退出登录
export function logout () {
    return axios.post('/admin/logout') 
}
// 修改密码
export function updatePassword(pwdData) {
    return axios.post('/admin/updatepassword', pwdData)
}

// 管理员列表
export function getManagerList (page, query = {}) {
    let r = queryParams(query)
    return axios.get(`/admin/manager/${page}${r}`)
}

// 更新管理员状态
export function updateManagerStatus (id, status) {
    return axios.post(`/admin/manager/${id}/update_status`, {
        status
    })
}

// 新建管理员
export function createManager (data) {
    return axios.post(`/admin/manager`, data)
}

// 更新管理员信息
export function updateManager(id, data) {
    return axios.post(`/admin/manager/${id}`, data)
}

// 删除管理员
export function deleteManager(id) {
    return axios.post(`/admin/manager/${id}/delete`)
}