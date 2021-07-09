/*
 * @Author: fremember
 * @Date: 2021-06-16 08:39:12
 * @Description: 导出默认网络配置
 */
const network = {
    contentType: 'application/json;charset=UTF-8',// 配后端数据的接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8
    messageDuration: 3000,// 消息框消失时间
    requestTimeout: 10000,// 最长请求时间
    successCode: [200, 0],// 操作正常code，支持String、Array、int多种类型
    updateLimit: 2000000// 上传文件时限制文件大小
}
export default network