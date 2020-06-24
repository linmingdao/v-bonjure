/**
 * 日期格式化
 * @param {*} date
 * @param {*} fmt
 */
function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return fmt;
}

/**
 * 获取最近一周时间
 */
function latestWeek() {
    const end = new Date();
    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(59);
    const start = new Date();
    start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    return [formatDate(start), formatDate(end)];
}

/**
 * 获取最近两周时间
 */
function latestTowWeek() {
    const end = new Date();
    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(59);
    const start = new Date();
    start.setTime(end.getTime() - 3600 * 1000 * 24 * 14);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    return [formatDate(start), formatDate(end)];
}

/**
 * 获取最近一个月时间
 */
function latestMonth() {
    const end = new Date();
    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(59);
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    return [formatDate(start), formatDate(end)];
}

/**
 * 获取最近三个月时间
 */
function latestThreeMonth() {
    const end = new Date();
    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(59);
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    return [formatDate(start), formatDate(end)];
}

/**
 * 计算两个时间之间相差几天
 * @param {*} sDate1
 * @param {*} sDate2
 */
function calcDateSpanByDay(sDate1, sDate2) {
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    let dateSpan = Math.abs(sDate2 - sDate1);
    let iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays;
}

function timer2Cron({
    seconds = [],
    minutes = [],
    hours = [],
    daysOfMonth = [],
    months = [],
    daysOfWeek = [],
    years = []
}) {
    let cronArray = [];
    cronArray.push(!seconds.length ? '*' : seconds.join(','));
    cronArray.push(!minutes.length ? '*' : minutes.join(','));
    cronArray.push(!hours.length ? '*' : hours.join(','));
    cronArray.push(!daysOfMonth.length ? '?' : daysOfMonth.join(','));
    cronArray.push(!months.length ? '*' : months.join(','));
    cronArray.push(!daysOfWeek.length ? '*' : daysOfWeek.join(','));
    cronArray.push(!years.length ? '*' : years.join(','));
    return cronArray.join(' ');
}

function cron2Timer(cron) {
    const cronArray = cron.split(' ');
    let seconds = [];
    let minutes = [];
    let hours = [];
    let daysOfMonth = [];
    let months = [];
    let daysOfWeek = [];
    let years = [];
    cronArray.forEach((element, index) => {
        switch (index) {
            case 0:
                seconds = element === '*' ? '*' : seconds.concat(element.split(',').map(e => parseInt(e)));
                break;
            case 1:
                minutes =
                    element === '*' ? minutes.concat([]) : minutes.concat(element.split(',').map(e => parseInt(e)));
                break;
            case 2:
                hours = element === '*' ? hours.concat([]) : hours.concat(element.split(',').map(e => parseInt(e)));
                break;
            case 3:
                daysOfMonth =
                    element === '*' || element === '?'
                        ? daysOfMonth.concat([])
                        : daysOfMonth.concat(element.split(',').map(e => parseInt(e)));
                break;
            case 4:
                months = element === '*' ? months.concat([]) : months.concat(element.split(',').map(e => parseInt(e)));
                break;
            case 5:
                daysOfWeek =
                    element === '*' || element === '?'
                        ? daysOfWeek.concat([1, 2, 3, 4, 5, 6, 7])
                        : daysOfWeek.concat(element.split(',').map(e => parseInt(e)));
                break;
            case 6:
                years = element === '*' ? years.concat([]) : years.concat(element.split(',').map(e => parseInt(e)));
                break;
            default:
        }
    });
    return { seconds, minutes, hours, daysOfMonth, months, daysOfWeek, years };
}

export default {
    timer2Cron,
    cron2Timer,
    formatDate,
    latestWeek,
    latestTowWeek,
    latestMonth,
    calcDateSpanByDay,
    latestThreeMonth
};
