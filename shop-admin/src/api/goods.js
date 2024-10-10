import axios from '@/utils/axios'
import { queryParams } from '../utils/lib'

/**
 * 商品列表
 * @param {*} page number 页码
 * @param {*} query object
 *  {
 *      tab: string 订单类型：all全部，checking审核中，saling出售中，off已下架，min_stock库存预警，delete回收站
 *      title: string 关键词
 *      category_id: number 分类id
 *      limit: number 每页显示条数，默认10
 *  }
 * @returns 
 */
export function getGoodsList (page, query = {}) {
    let r = queryParams(query)
    return axios.get(`/admin/goods/${page}${r}`)
}

/**
 * 添加商品
 * @param {*} data object
 *  {
        "title": string 商品名称		
        "category_id": number 商品分类
        "cover": string 商品封面
        "desc": string 商品描述
        "unit": string 商品单位
        "stock": number 总库存
        "min_stock": number 库存预警
        "status": number 是否上架 0仓库1上架
        "stock_display": number 库存显示 0隐藏1禁用
        "min_price": number 最低销售价
        "min_oprice":number 最低原价
 *  }
 * @returns 
 */
export function createGoods (data) {
    return axios.post(`/admin/goods`, data)
}

/**
 * 修改商品
 * @param {*} id number 商品ID
 * @param {*} data object extends 添加商品的data 并新增 content string 商品详情
 * @returns 
 */
export function updateGoods (id, data) {
    return axios.post(`/admin/goods/${id}`, data)
}

/**
 * 批量上架下架商品
 * @param {*} ids number[] 商品id
 * @param {*} status number 状态
 * @returns 
 */
export function updateGoodsStatus(ids, status) {
    return axios.post(`/admin/goods/changestatus`, { ids, status })
}

/**
 * 批量删除商品
 * @param {*} ids number[] 商品id
 * @returns 
 */
export function deleteGoods (ids) {
    return axios.post(`/admin/goods/delete_all`, { ids })
}

/**
 * 批量恢复商品
 * @param {*} ids number[] 商品id
 * @returns 
 */
export function restoreGoods(ids) {
    return axios.post('/admin/goods/restore', { ids })
}

/**
 * 彻底删除商品
 * @param {*} ids number[] 商品id
 * @returns 
 */
export function destroyGoods (ids) {
    return axios.post('/admin/goods/destroy', { ids })
}

/**
 * 查看商品资料
 * @param {*} id number 商品id
 * @returns 
 */
export function readGoods (id) {
    return axios.get(`/admin/goods/read/${id}`)
}

/**
 * 设置商品轮播图
 * @param {*} id number 商品id
 * @param {*} data object { banners: [] }; banners: string[] 轮播图地址
 * @returns 
 */
export function setGoodsBanner (id, data) {
    return axios.post(`/admin/goods/banners/${id}`, { data })
}

/**
 * 更新商品规格
 * @param {*} id number 商品ID
 * @param {*} data object { sku_type: number, sku_value: object, goodsSkus: object[] }
 * @returns 
 */
export function updateGoodsSkus (id, data) {
    return axios.post(`/admin/goods/updateskus/${id}`, { data })
}

/**
 * 添加商品规格选项
 * @param {*} data object { goods_id: number 商品ID, name: string 规格名称, order: number 排序, type: number 规格类型 0文字 }
 * @returns 
 */
export function createGoodsSkusCard (data) {
    return axios.post(`/admin/goods_skus_card`, { data })
}

/**
 * 修改商品规格选项
 * @param {*} id 规格ID
 * @param {*} data object { goods_id: number 商品ID, name: string 规格名称, order: number 排序, type: number 规格类型 0文字 }
 * @returns 
 */
export function updateGoodsSkusCard (id, data) {
    return axios.post(`/admin/goods_skus_card/${id}`, { data })
}

/**
 * 删除商品规格选项
 * @param {*} id number 规格ID
 */
export function deleteGoodsSkusCard (id) {
    return axios.post(`/admin/goods_skus_card/${id}/delete`)
}

/**
 * 排序商品规格选项
 * @param {*} data 
 * @returns 
 */
export function sortGoodsSkusCard (data) {
    return axios.post(`/admin/goods_skus_card/sort`, data)
}

/**
 * 添加商品规格选项的值
 * @param {*} data object { goods_skus_card_id: number 商品ID, name: string 规格名称, order: number 排序, value: string }
 */
export function createGoodsSkusCardValue (data) {
    return axios.post(`/admin/goods_skus_card_value`, data)
}

/**
 * 修改商品规格选项的值
 * @param {*} id number 规格选项ID
 * @param {*} data  object { goods_skus_card_id: number 商品ID, name: string 规格名称, order: number 排序, value: string }
 * @returns 
 */
export function updateGoodsSkusCardValue (id, data) {
    return axios.post(`/admin/good_skus_card_value/${id}`, data)
}

/**
 * 删除商品规格选项的值
 * @param {*} id number 规格选项ID
 * @returns 
 */
export function deleteGoodsSkusCardValue (id) {
    return axios.post(`/admin/goods_skus_card_value/${id}/delete`)
}

/**
 * 选择设置商品规格选项和值
 * @param {*} id number 规格ID
 * @param {*} data object { name: string 规格名称, value: string[] 规格选项名称 }
 * @returns 
 */
export function chooseAndSetGoodsSkusCard (id, data) {
    return axios.post(`/admin/goods_skus_card/${id}/set`, data)
}