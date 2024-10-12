// 把驼峰转换成横杠连接
export const toLine = (value: string) => {
    return value.replace(/(A-Z)g/,'-$1').toLocaleLowerCase()
}

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

// 根据有效时间获取当前的年月日
export function getDateInfo(input: any, type: number): any {
    const date = new Date(input);
    const res = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        hour: date.getHours(),
        minutes: date.getMinutes()
    };
    if (type == 0) {
        return res;
    } else {
        return `${res.year}/${res.month}/${res.date} ${res.hour}:${res.minutes}`;
    }
}
// 判断是不是闰年
function isLeap(year: number): boolean {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}
  
/**
 * 通过参考时间获取格式化后的时间
 * @param other 参考时间
 * @param type 年：year 月: month 周: date 日: day
 * @param space 间隔
 * @param from 开始的时间节点，start: 00:00, now: 当前时间，end: 结束时间
 */
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export function getDateByOtherDate(other: any, type: string, space: number, from: string): any {
    const otherInfo = getDateInfo(other, 0);
    if (isLeap(otherInfo.year)) {
        months[1] = 29;
    }
    const res = {
        year: 0,
        month: 0,
        date: 0
    };
    switch (type) {
        case 'month': // 月
            if (otherInfo.month < space) {
                res.month = otherInfo.month + 12 - space;
                res.year = otherInfo.year - 1;
            } else {
                res.month = otherInfo.month - space;
                res.year = otherInfo.year;
            }
            if (res.month == 2) {
                if (otherInfo.date >= 29) {
                    res.date = isLeap(res.year) ? 29 : 28;
                } else {
                    res.date = otherInfo.date;
                }
            } else {
                if (otherInfo.date == 31) {
                    res.date = months[res.month - 1];
                } else {
                    res.date = otherInfo.date;
                }
            }
            break;
        case 'date': // 周
            if (otherInfo.date < space * 7) {
                res.date = otherInfo.date + months[otherInfo.month - 1] - space * 7;
                if (res.month == 1) {
                    res.month = 12;
                    res.year = otherInfo.year - 1;
                } else {
                    res.month = otherInfo.month;
                    res.year = otherInfo.year;
                }
            } else {
                res.date = otherInfo.date - space * 7;
                res.month = otherInfo.month;
                res.year = otherInfo.year;
            }
            break;
    }
    let timeStr = '';
    switch (from) {
        case 'start':
            timeStr = '00:00';
            break;
        case 'now':
            timeStr = `${doubleDate(otherInfo.hour)}:${doubleDate(otherInfo.minutes)}`;
            break;
        case 'end':
            timeStr = '23:59';
            break;
    }
    return `${res.year}/${doubleDate(res.month)}/${doubleDate(res.date)} ${timeStr}`;
}