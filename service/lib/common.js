/*
 * @Author: fremember
 * @Date: 2021-06-21 11:41:09
 * @Description: 公共处理方法
 */

let routesWhiteList = ['/user/login', '/user/register', '/user/logout', '/user/updatePwd', '/user/checkUsername', '/user/sms', '/common/getImgVerify']
/**
 * 验证接口是否存在于白名单中
 * @param {*} url 接口地址
 * return boolean true：存在，false：不存在
 */
function checkWhitelist (url) {
    let _flag = false
    routesWhiteList.forEach(itm => {
        if (url.indexOf(itm) >= 0) {
            _flag = true
        }
    })
    return _flag
}
function doubleDate(date) {
    return date < 10 ? '0' + date : date;
}

/**
 * 格式化时间
 */
function formatDate(type, date) {
    let _date = date ? new Date(date) : new Date(),
        o = {
            "yyyy": _date.getFullYear(),
            "MM": doubleDate(_date.getMonth() + 1), // 月
            "dd": doubleDate(_date.getDate()), // 日
            "HH": doubleDate(_date.getHours()),// 小时
            "mm": doubleDate(_date.getMinutes()), // 分
            "ss": doubleDate(_date.getSeconds()) // 秒
        };
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(type)) {
            type = type.replace(RegExp.$1, o[k])
        }
    }
    return type
}

module.exports = { checkWhitelist, formatDate }