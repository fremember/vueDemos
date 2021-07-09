/*
 * @Author: fremember
 * @Date: 2021-06-16 08:39:49
 * @Description: 导出默认通用配置
 */
const setting = {
    prefix: 'fremember_',// 浏览器存储字段的前缀
    routesWhiteList: ['/', '/login', '/register', '/forget', '/modify', '/404', '/403', '/502'],// 不经过token校验的路由
    outputDir: 'fremember_vvv',// 生产环境构建文件的目录名
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:1413/' : '',// 默认的接口地址 配置成需要的接口地址
    title: 'fremember',// 标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
    titleSeparator: ' - ',// 标题分隔符
    titleReverse: false,// 标题是否反转 如果为false:"page - title"，如果为ture:"title - page"
    devPort: 1314,// 开发环境端口号
    version: process.env.VUE_APP_VERSION,// 版本号
    keepAliveMaxNum: 99,// 缓存路由的最大数量
    loadingText: '正在加载中...',// 加载时显示文字
    recordRoute: true,// token失效回退到登录页时是否记录本次的路由
    loginInterception: true,// 是否开启登录拦截
    rolesControl: true,// 是否开启roles字段进行角色权限控制（如果是all模式后端完全处理角色并进行json组装，可设置false不处理路由中的roles字段）
    uniqueOpened: false,// vertical gallery comprehensive common布局时是否只保持一个子菜单的展开
    openFirstMenu: true// 画廊布局和综合布局时，是否点击一级菜单默认开启第一个二级菜单
}

export default setting