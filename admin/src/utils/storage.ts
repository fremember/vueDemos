/*
 * @Author: fremember
 * @Date: 2021-09-29 08:35:31
 * @Description: 本地存储
 */
import Cookies from 'js-cookie'

const prefix: string = 'fremember_'
export default class Storage {
    private prefix: string = 'fremember_' // key值前缀
    /**
     * @description 根据key获取存储的内容
     * @params type 存储类型, 0：sessionStorage，1：localStorage，2：cookie
     * @return string number 然会存储的内容，如果没有返回空串
     */
    public getStorage (key: string, type?: number): string {
        const _key: string = `${this.prefix}${key}`
        switch (type) {
            case 0:
                return sessionStorage.getItem(_key) || ''
            case 1:
                return localStorage.getItem(_key) || ''
            case 2:
                return Cookies.get(key) || ''
            default:
                return sessionStorage.getItem(_key) || ''
        }
    }

    /**
     * @description 存储key_value键值对
     * @params key string 存储用的key
     * @params value string 存储的值
     * @params type number 存储类型, 0：sessionStorage，1：localStorage，2：cookie
     * @return void
     */
    public setStorage (key: string, value: string, type?: number): void {
        const _key: string = `${this.prefix}${key}`
        switch (type) {
            case 0:
                sessionStorage.setItem(_key, value)
                break
            case 1:
                localStorage.setItem(_key, value)
                break
            case 2:
                Cookies.set(key, value)
                break
            default:
                sessionStorage.setItem(_key, value)
                break
        }
    }

    /**
     * @description 根据key删除存储的某个key_value键值对
     * @params key string 需要删除的key
     * @params type number 存储类型, 0：sessionStorage，1：localStorage，2：cookie
     * @return void
     */
    public removeStorage (key: string, type: number): void {
        const _key: string = `${this.prefix}${key}`
        switch (type) {
            case 0:
                sessionStorage.removeItem(_key)
                break
            case 1:
                localStorage.removeItem(_key)
                break
            case 2:
                Cookies.remove(key)
                break
            default:
                sessionStorage.removeItem(_key)
                break
        }
    }

    /**
     * @description 清除所有存储
     * @params type number 存储类型, 0：sessionStorage，1：localStorage，2：cookie
     * @return void
     */
    public clearStorage (type: number): void {
        switch (type) {
            case 0:
                sessionStorage.clear()
                break
            case 1:
                localStorage.clear()
                break
            case 2:
                Object.keys(Cookies.get()).forEach((key: string): void => {
                    Cookies.remove(key)
                })
                break
            default:
                sessionStorage.clear()
                break
        }
    }
}