/*
 * @Author: fremember
 * @Date: 2021-05-12 11:20:50
 * @Description: 工具方法
 */

// 格式化对象为get请求的字符串数据
export function formatQueryString<T> (obj: T): string {
    const _obj: any = obj
    let _res = ''
    if(obj) {
        const _aKeys = Object.keys(_obj),
            len = _aKeys.length;
        if (_aKeys.length > 0) {
            _res = '?'
            _aKeys.forEach((attr: string, index: number): void => {
                _res = `${_res}${attr}=${_obj[attr]}${index < len - 1 ? '&' : ''}`
            })
        }
    }
    return _res
}

import config from '@/config'

const {
    setting: { 
        title,
        titleReverse,
        titleSeparator
    }
} = config

// 切换路由时修改title属性
export function getPageTitle(pageTitle: string): string {
    let newTitles: Array<string> = []
    if (pageTitle) newTitles.push(pageTitle)
    if (title) newTitles.push(title)
    if (titleReverse) newTitles = newTitles.reverse()
    return newTitles.join(titleSeparator)
}