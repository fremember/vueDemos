/*
 * @Author: fremember
 * @Date: 2021-05-17 09:31:26
 * @Description: 
 */
let api = ''
if (window.location.host.indexOf(':1314') > 0) {
    api = '/api'// 开发代理使用
} else {
    api = ''// 测试环境
}
export const Urls = {
    login: {
        captcha: `${api}/captcha.htm`,// 图形验证码
        login: `${api}/login`, // 登录接口
        logout: `${api}/login/logout` // 注销接口
    }
}