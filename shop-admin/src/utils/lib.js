/**
 * 请求拦截时，处理接口地址，返回值删除query形式的参数
 * @param {*} url 
 */
export function delQueryFromUrl (url) {
    let res = url
    if(url.indexOf('?') >= 0) {
        res = url.split('?')[0] 
    }
    return res
}

import nprogress from 'nprogress'
// 显示全屏loading
export function showFullLoading () {
    nprogress.start()
}
// 隐藏全屏loading
export function hideFullLoading () {
    nprogress.done()
}
// 将query对象转换成url参数
export function queryParams (query) {
    let q = []
    for(const key in query) {
        if(query[key]) {
            q.push(`${key}=${encodeURIComponent(query[key])}`)
        }
    }
    let r = q.join('&')
    r = r ? `?${r}` : ''
    return r
}