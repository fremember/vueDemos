/**
 * 
 */
import axios from '@/utils/axios'

/**
 * 会员等级列表
 * @param {*} page 分页页码
 * @returns 
 */
export function getUserLevelList(page) {
    return axios.get(`/admin/user_level/${page}`)
}

/**
 * 增加会员等级
 * @param {*} data object {
 *  name: string 等级名称,
 *  level: number 等级权重,
 *  status: number 状态：0禁用1启用,
 *  discount: number 折扣率(%)
 *  max_price: number 累计消费金额
 *  max_times: number 累计消费次数
 * }
 * @returns 
 */
export function createUserLevel(data) {
    return axios.post("/admin/user_level", data)
}

/**
 * 修改会员等级
 * @param {*} id 会员等级ID
 * @param {*} data object {
 *  name: string 等级名称,
 *  level: number 等级权重,
 *  status: number 状态：0禁用1启用,
 *  discount: number 折扣率(%)
 *  max_price: number 累计消费金额
 *  max_times: number 累计消费次数
 * }
 * @returns 
 */
export function updateUserLevel(id, data) {
    return axios.post(`/admin/user_level/${id}`, data)
}

/**
 * 删除会员等级
 * @param {*} id 会员等级ID
 * @returns 
 */
export function deleteUserLevel(id) {
    return axios.post(`/admin/user_level/${id}/delete`)
}

/**
 * 修改会员等级状态
 * @param {*} id 会员等级ID
 * @param {*} status number 状态：0禁用1启用
 * @returns 
 */
export function updateUserLevelStatus(id, status) {
    return axios.post(`/admin/user_level/${id}/update_status`, {
        status
    })
}