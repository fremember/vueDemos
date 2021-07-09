/*
 * @Author: fremember
 * @Date: 2021-06-24 09:27:31
 * @Description: 工具方法
 */

// 格式化对象为get请求的字符串数据
export function formatQueryString(obj) {
    const _obj = obj
    let _res = ''
    if (obj) {
        const _aKeys = Object.keys(_obj),
            len = _aKeys.length;
        if (_aKeys.length > 0) {
            _res = '?'
            _aKeys.forEach((attr, index) => {
                _res = `${_res}${attr}=${_obj[attr]}${index < len - 1 ? '&' : ''}`
            })
        }
    }
    return _res
}