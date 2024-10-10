/**
 * 权限管理
 */
import axios from '@/utils/axios'

export function getAccessList(page) {
    return axios.get(`/admin/rule/${page}`)
}

export function createAccess(data) {
    return axios.post("/admin/rule", data)
}

export function updateAccess(id, data) {
    return axios.post("/admin/rule/" + id, data)
}

export function updateAccessStatus(id, status) {
    return axios.post(`/admin/rule/${id}/update_status`, {
        status
    })
}

export function deleteAccess(id) {
    return axios.post(`/admin/rule/${id}/delete`)
}