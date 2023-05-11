import { ElNotification, ElMessageBox } from 'element-plus'

// 通知
export function notification({ title = '', message, type, duration = 2000, dangerouslyUseHTMLString = false } = option) {
    ElNotification({ title, message, type, duration, dangerouslyUseHTMLString })
}

//
export function showModel({ context = '提示内容', type = 'warning', title = '提示' } = option) {
    return ElMessageBox.confirm(context, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type
    })
}