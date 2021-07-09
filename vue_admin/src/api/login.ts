/*
 * @Author: fremember
 * @Date: 2021-05-17 09:17:36
 * @Description: 
 */
import { Pxyaxios } from './../util/request'
import { Urls } from './../util/urls' 
export class LoginService {
    public async captcha (): Promise<any> {
        const result = await Pxyaxios.get({ url: Urls.login.captcha })
        return result
    }
    // 登录
    // public async login () {} 
    // 退出
    public async logout (): Promise<boolean> {
        await Pxyaxios.post<any>({ url: Urls.login.logout })
        return true
    }
}