/**
 * @Author: fremember
 * @Date: 2023-08-26 17:13:56
 * @LastEditTime: 2023-08-26 17:16:56
 * @LastEditors: xiangyang.peng
 * @Description: 分销模块相关api
 * @FilePath: /fremember_github/vueDemos/shop-admin/src/api/distribution.js
 */

import axios from '@/axios'
import { queryParams } from '../utils/lib'


export function getAgentList(page, query = {}) {
    let r = queryParams(query)
    return axios.get(`/admin/agent/${page}${r}`)
}

export function getAgentOrderList(page, query = {}) {
    let r = queryParams(query)
    return axios.get(`/admin/user_bill/${page}${r}`)
}

export function getAgentStatistics() {
    return axios.get("/admin/agent/statistics")
}

export function getConfig() {
    return axios.get(`/admin/distribution_setting/get`)
}

export function setConfig(data) {
    return axios.post(`/admin/distribution_setting/set`,data)
}