import { useCookies } from '@vueuse/integrations/useCookies'

const cookies = useCookies()

export default (function () {
    const get = function (key) {// 获取cookie值
            return cookies.get(key)
        },
        set = function (key, value) {// 设置cookie值
            cookies.set(key, value)
        },
        remove = function (key) {// 删除cookie值
            cookies.remove(key)
        };
    return {
        get, 
        set,
        remove
    }
})()