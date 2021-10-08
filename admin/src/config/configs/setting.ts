/*
 * @Author: fremember
 * @Date: 2021-09-29 10:30:30
 * @Description: 
 */
const setting: any = {
    title: 'admin',// 标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
    titleReverse: false, // 标题是否反转 如果为false: "page - title"，如果为ture: "title - page"
    titleSeparator: ' - ',// 标题分隔符
    routeWhiteList: ['/', '/login', '/register', '/forget'],// 前端路由白名单，做路由守卫使用
    requestWhiteList: ['/common/login', '/common/register', '/common/getImgVerify'],// 后台接口白名单，axios拦截的时候，在请求头里面配置token
}
export default setting