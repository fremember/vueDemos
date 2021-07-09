/*
 * @Author: fremember
 * @Date: 2021-06-15 16:09:53
 * @Description: 浏览器存储
 */

/**
 * @description 获取attr对应的值
 * @param string attr 获取数据的key
 * @param type number 存储类型，1: sessionStorage, 2: localStorage, 3: cookie
 * @return string attr对应的值，不存在的时候返回空字符串
 */
import cookie from 'js-cookie'

export function getStorage(attr, type) {
    let _res = ''
    switch (type) {
        case 1:
            _res = sessionStorage.getItem(attr) || _res
            break
        case 2:
            _res = localStorage.getItem(attr) || _res
            break
        case 3:
            _res = cookie.get(attr) || _res
            break
    }
    return _res
}

/**
 * @description 存储attr和value的键值对
 * @param string attr
 * @param value attr
 * @param type number 存储类型，1: sessionStorage, 2: localStorage, 3: cookie
 * @return void
 */
export function setStorage(attr, value, type) {
    switch (type) {
        case 1:
            sessionStorage.setItem(attr, value)
            break
        case 2:
            localStorage.setItem(attr, value)
            break
        case 3:
            cookie.set(attr, value)
            break
    }
}


/**
 * @description 移除attr对应的值
 * @param type number 存储类型，1: sessionStorage, 2: localStorage, 3: cookie
 * @return void
 */
export function removeStorage(attr, type) {
    switch (type) {
        case 1:
            sessionStorage.removeItem(attr)
            break
        case 2:
            localStorage.removeItem(attr)
            break
        case 3:
            cookie.remove(attr)
            break
    }
}

/**
 * @description 清空浏览器存储
 * @param type number 存储类型，1: sessionStorage, 2: localStorage, 3: cookie
 */
export function clearStorage(type) {
    switch (type) {
        case 1:
            sessionStorage.clear()
            break
        case 2:
            localStorage.clear()
            break
        case 3:
            let keys = document.cookie.match(/[^ =;]+(?=\=)/g)
            if (keys) {
                keys.forEach(item => {
                    cookie.remove(item)
                })
            }
            break
    }
}