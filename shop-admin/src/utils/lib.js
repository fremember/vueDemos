/**
 * 将小写的金额转换成大写金额
 * @param {*} num 
 * @returns 
 */
function numToString(num) {
    if (num > 999999999) throw '超过金额上限，最大单位为亿'
    const unitMap = ['', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿']
    const stringMap = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
    const n = num + ''
    const len = n.length
    let lastIndex = len - 1
    let result = ''
    for (let i = 0; i < len; i++) {
        if (i > 0 && n[i] == '0') {
            if (n[i - 1] != '0') result += '零'
        } else {
            result += stringMap[n[i]] + unitMap[lastIndex]
        }

        lastIndex--
    }
    
    lastIndex = result.length - 1
    if (result[lastIndex] == '零') return result.slice(0, lastIndex)
    return result
}


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

function swapArray (arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0]
    return arr
}

// 数组元素上移
export function useArrayMoveUp(arr, index) {
    swapArray(arr, index, index - 1)
}

// 数组元素下移
export function useArrayMoveDown(arr, index) {
    swapArray(arr, index, index + 1)
}

// sku算法
export function cartesianProductOf () {
    return Array.prototype.reduce.call(arguments, (a, b) => {
        let ret = []
        a.forEach(_a => {
            b.forEach(_b => {
                ret.push(_a.concat([_b]))
            })
        })
        return ret
    }, [[]])
}

