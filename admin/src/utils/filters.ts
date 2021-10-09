/*
 * @Author: fremember
 * @Date: 2021-10-08 15:42:17
 * @Description: 
 */
function doubleDate(date: number): string {
    return date < 10 ? `0${date}` : `${date}`;
}
function changeDay(date: number): string {
    let weekday: Array<string> = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    return weekday[date]
}
export function formatDate(type: string, input?: string | number): string {
    let date: any = input ? new Date(input) : new Date(),
        o: any = {
            "yyyy": date.getFullYear(),
            "MM": doubleDate(date.getMonth() + 1), //月份
            "dd": doubleDate(date.getDate()), //日
            "HH": doubleDate(date.getHours()),//小时
            "mm": doubleDate(date.getMinutes()), //分
            "ss": doubleDate(date.getSeconds()), //秒
            "week": changeDay(date.getDay())
        };
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(type)) {
            type = type.replace(RegExp.$1, o[k]);
        }
    }
    return type;
}