/**
 * @Author: xiangyang.peng
 * @Date: 2023-08-26 17:21:12
 * @LastEditTime: 2023-08-26 17:21:14
 * @LastEditors: xiangyang.peng
 * @Description:  
 * @FilePath: /fremember_github/vueDemos/shop-admin/src/api/order.js
 */

import axios from '@/utils/axios'
import { queryParams } from '../utils/lib'

export function getOrderList(page, query = {}){
    let r = queryParams(query)
    return axios.get(`/admin/order/${page}${r}`)
}


export function deleteOrder(ids) {
    return axios.post(`/admin/order/delete_all`, {
        ids
    })
}

export function exportOrder(query = {}) {
    let r = queryParams(query)
    return axios.post(`/admin/order/excelexport${r}`, {}, {
        responseType:"blob"
    })
}

export function getShipInfo(id) {
    return axios.get(`/admin/order/${id}/get_ship_info`)
}

export function refundOrder(id, data) {
    return axios.post(`/admin/order/${id}/handle_refund`, data)
}