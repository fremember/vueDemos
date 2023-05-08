/*
 * @Author: fremember
 * @Date: 2021-09-24 11:39:08
 * @Description: 
 */
import { Pxyaxios } from '@/utils/request'
import { Urls } from '@/utils/urls'

import { LoginForm } from '@/interface/common'

export default class CommonService {
    public async captcha (data: any): Promise<any> {
        return await Pxyaxios.post({ url: Urls.login.captcha, data })
    }
    // 登录
    public async login (data: LoginForm): Promise<any> {
        return await Pxyaxios.post({ url: Urls.login.login, data})
    }
    // 注册用户时校验唯一性
    public async checkUsername (data: any): Promise<any> {
        return await Pxyaxios.post({ url: Urls.login.checkUsername, data})
    }
    // 注册
    public async register (data: any): Promise<any> {
        return await Pxyaxios.post({ url: Urls.login.register, data})
    }
    // 退出
    public async logout (): Promise<boolean> {
        await Pxyaxios.get({ url: Urls.login.logout })
        return true
    }
    // 登录用户获取前端路由
    public async getRoutes (data: any): Promise<any> {
        return await Pxyaxios.get({ url: Urls.login.getRoutes, data})
    }
    // 添加路有时候，获取顶极路由
    public async getParentRoutes (): Promise<any> {
        return await Pxyaxios.get({ url: Urls.login.getParentRoutes })
    }
    // 新增路由
    public async addRoute (data: any): Promise<any> {
        return await Pxyaxios.post({ url: Urls.login.addRoute, data })
    }
}