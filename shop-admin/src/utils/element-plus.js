import { ElNotification, ElMessageBox } from 'element-plus'

// 通知
export function notification({ title = '', message, type = 'success', duration = 2000, dangerouslyUseHTMLString = false } = option) {
    ElNotification({ title, message, type, duration, dangerouslyUseHTMLString })
}

// 二次确认弹窗
export function showModel({ context = '提示内容', type = 'warning', title = '提示' } = option) {
    return ElMessageBox.confirm(context, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type
    })
}
// 弹出输入框
export function showPrompt (tip, value = '') {
    return ElMessageBox.prompt(tip, '', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValue: value
    })
}