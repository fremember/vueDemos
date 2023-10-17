/**
 * 商品分类相关api
 */
import axios from '@/utils/axios'

// 商品分类列表
export function getCategoryList(){
    return  axios.get("/admin/category")
}

/**
 * 增加商品分类
 * @params data object { name: '**' } 分类名称
 */
export function createCategory(data){
    return axios.post("/admin/category",data)
}

/**
 * 修改商品分类
 * @patams id number 商品分类的id
 * @params data object { name: '**' } 分类名称
 */
export function updateCategory(id, data){
    return axios.post(`/admin/category/${id}`, data)
}

/**
 * 修改商品分类状态
 * @params id number 商品分类的id
 * @params status 状态：0禁用,1启用
 */
export function updateCategoryStatus(id, status){
    return axios.post(`/admin/category/${id}/update_status`,{
        status
    })
}

/**
 * 删除商品分类
 * @params id number 商品分类id
 */
export function deleteCategory(id){
    return axios.post(`/admin/category/${id}/delete`)
}

/**
 * 分类关联产品列表
 * @params id number 商品分类id
 */
export function getCategoryGoods(id){
    return  axios.get(`/admin/app_category_item/list?category_id=${id}`)
}

/**
 * 删除关联产品
 * @params id number 分类产品关联id
 */
export function deleteCategoryGoods(id){
    return axios.post(`/admin/app_category_item/${id}/delete`)
}

/**
 * 关联产品
 * @params data object { category_id: 商品分类id, goods_ids: [ 商品id ] }
 */
export function connectCategoryGoods(data){
    return axios.post(`/admin/app_category_item`,data)
}