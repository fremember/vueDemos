/**
 * @Author: xiangyang.peng
 * @Date: 2023-08-26 17:18:13
 * @LastEditTime: 2023-08-26 17:18:14
 * @LastEditors: xiangyang.peng
 * @Description:  
 * @FilePath: /fremember_github/vueDemos/shop-admin/src/api/goods_comment.js
 */

import axios from '@/utils/axios'
import { queryParams } from '../utils/lib'

export function getGoodsCommentList(page, query = {}) {
    let r = queryParams(query)
    return axios.get(`/admin/goods_comment/${page}${r}`)
}


export function updateGoodsCommentStatus(id, status) {
    return axios.post(`/admin/goods_comment/${id}/update_status`,{
        status
    })
}

export function reviewGoodsComment(id,data) {
    return axios.post(`/admin/goods_comment/review/${id}`, {
        data
    })
}