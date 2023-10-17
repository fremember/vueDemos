/**
 * @Author: xiangyang.peng
 * @Date: 2023-08-26 17:20:23
 * @LastEditTime: 2023-08-26 17:20:35
 * @LastEditors: xiangyang.peng
 * @Description:  
 * @FilePath: /fremember_github/vueDemos/shop-admin/src/api/sysconfig.js
 */

import axios from '@/axios'

export function getSysconfig() {
    return axios.get(`/admin/sysconfig`)
}

export function setSysconfig(data) {
    return axios.post(`/admin/sysconfig`, data)
}

export const uploadAction = import.meta.env.VITE_APP_BASE_API + "/admin/sysconfig/upload"