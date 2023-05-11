import axios from '@/utils/axios.js'

// 登录接口
export function login (loginData) {
    return axios.post('/admin/login', loginData)
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