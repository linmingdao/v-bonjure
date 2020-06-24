const numeral = require('numeral');

export default {
    /**
     * 服务器
     * @param {*} param0
     */
    formatKid({ kid, overall }) {
        return `
            <div class="status-icon" style="font-weight:bold;color:#000;">${numeral(kid).format('0,0')}服</div>
            <div>${overall === 0 ? '区分平台' : '不区分平台'}</div>
        `;
    },
    /**
     * 服务器状态
     * @param {*} param0
     */
    formatServerStatus({ serverStatus }) {
        switch (serverStatus) {
            case 1:
                return '<div>正常</div>';
            case 2:
                return '<div>维护</div>';
            case 3:
                return '<div>新服</div>';
            default:
                return '<div>未知状态</div>';
        }
    },
    /**
     * 开服时间
     * @param {*} param0
     */
    formatOpenTime({ openTime }) {
        if (typeof openTime === 'undefined') {
            return '<div>-</div>';
        } else {
            const timeArray = openTime.split(' ');
            return `
                <div>${timeArray[0]}</div>
                <div>${timeArray[1]}</div>
            `;
        }
    },
    /**
     * 导量开始时间
     * @param {*} param0
     */
    formatStartTime({ startTime }) {
        if (typeof startTime === 'undefined') {
            return '<div>-</div>';
        } else {
            const timeArray = startTime.split(' ');
            return `
                <div>${timeArray[0]}</div>
                <div>${timeArray[1]}</div>
            `;
        }
    },
    /**
     * 导量暂停时间
     * @param {*} param0
     */
    formatStopTime({ stopTime }) {
        if (typeof stopTime === 'undefined') {
            return '<div>-</div>';
        } else {
            const timeArray = stopTime.split(' ');
            return `
                <div>${timeArray[0]}</div>
                <div>${timeArray[1]}</div>
            `;
        }
    },
    /**
     * 导量满量时间
     * @param {*} param0
     */
    formatEndTime({ endTime }) {
        if (typeof endTime === 'undefined') {
            return '<div>-</div>';
        } else {
            const timeArray = endTime.split(' ');
            return `
                <div>${timeArray[0]}</div>
                <div>${timeArray[1]}</div>
            `;
        }
    },
    /**
     * 服务器总导量
     * @param {*} param0
     */
    formatTotalImportsNum({ totalImportsNum, totalNum, androidNotRuleNum, iosNotRuleNum }) {
        return `<div class="image-icon danger">${numeral(totalImportsNum / totalNum).format(
            '0.00%'
        )}</div><div>(${numeral(totalImportsNum).format('0,0')}/${numeral(totalNum).format(
            '0,0'
        )})</div><div>不按规则导量：</div><div class="image-icon android">${numeral(androidNotRuleNum).format(
            '0,0'
        )}</div><div class="image-icon ios">${numeral(iosNotRuleNum).format('0,0')}</div>`;
    },
    /**
     * 国家导量状态——android
     * @param {*} param0
     */
    formatCountryImportsStatusAndroid({ androidCurrentNum, androidNum, gamelang }) {
        const className = gamelang === '总量' ? '' : 'status-icon normal';
        return `
            <div class="${className}">${numeral(androidCurrentNum / androidNum).format('0.00%')}</div>
            <div>(${numeral(androidCurrentNum).format('0,0')}/${numeral(androidNum).format('0,0')})</div>
        `;
    },
    /**
     * 国家导量状态——ios
     * @param {*} param0
     */
    formatCountryImportsStatusIos({ iosCurrentNum, iosNum, gamelang }) {
        const className = gamelang === '总量' ? '' : 'status-icon normal';
        return `
            <div class="${className}">${numeral(iosCurrentNum / iosNum).format('0.00%')}</div>
            <div>(${numeral(iosCurrentNum).format('0,0')}/${numeral(iosNum).format('0,0')})</div>
        `;
    },
    formatCountryImportsStatus(numerator, denominator) {
        return `
            <div>${numeral(numerator / denominator).format('0.00%')}</div>
            <div>(${numeral(numerator).format('0,0')}/${numeral(denominator).format('0,0')})</div>
        `;
    },
    formatExpandImportsTime(androidTime, iosTime) {
        return `<div class="image-icon android">${androidTime}</div><div class="image-icon ios">${iosTime}</div>`;
    },
    formatPriority(priority) {
        return priority === 0 ? '<div>普通</div>' : '<div>优先</div>';
    },
    /**
     * 策略名称
     * @param {*} param0
     */
    formatTemplateName({ templateName }) {
        return `<span style="font-weight:bold;color:#ec7474;">策略名称：</span>${templateName}`;
    },
    /**
     * 导量总数设定
     * @param {*} param0
     */
    formatTotalNumSettings({ totalNum }) {
        return `<span style="font-weight:bold;color:#36ad7d;">导量总数设定：</span>${numeral(totalNum).format('0,0')}`;
    },
    /**
     * 策略是否分平台
     * @param {*} param0
     */
    formatStrategyPlatform({ overall }) {
        return `<span style="font-weight:bold;color:#4174d6;">策略是否分平台：</span>${
            overall === 1 ? '不区分平台' : '区分平台'
        }`;
    },
    /**
     * 登陆服情况
     * @param {*} param0
     */
    formatLoginServerStatus({ serverOverall }) {
        return `<span style="font-weight:bold;color:#a830f1;">登陆服情况：</span>${
            serverOverall === 1 ? '不区分平台' : '区分平台'
        }`;
    }
};
