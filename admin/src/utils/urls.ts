/*
 * @Author: fremember
 * @Date: 2021-09-24 11:45:21
 * @Description: 接口URL
 */
let api = ''
if (window.location.host.indexOf(':1314') > 0) {
    api = '/api'// 开发代理使用
} else {
    api = ''// 测试环境
}
export const Urls = {
    login: {
        captcha: `${api}/common/getImgVerify`,// 图形验证码
        login: `${api}/common/login`,// 登录接口
        checkUsername: `${api}/common/checkUsername`,// 注册时，验证用户名唯一性
        register: `${api}/common/register`,// 注册接口
        logout: `${api}/common/logout`,// 注销接口
        getRoutes: `${api}/common/getRoutes`,// 登录用户获取前端路由
        getParentRoutes: `${api}/common/getParentRoutes`,// 添加路有时候，获取顶极路由
        addRoute: `${api}/common/addRoute`,// 新增路由
    }
}