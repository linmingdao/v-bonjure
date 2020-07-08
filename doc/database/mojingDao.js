const uuid = require('uuid');

module.exports = {
    totalOfExtractList(extractName = '', purpose = '', finalExtractPerson = '') {
        return extractList.filter(item => {
            return (item.extractName.indexOf(extractName) !== -1) &&
                (item.purpose.indexOf(purpose) !== -1) &&
                (item.finalExtractPerson.indexOf(finalExtractPerson) !== -1);
        }).length;
    },
    queryExtractList(start = 0, end = 10, extractName = '', purpose = '', finalExtractPerson = '') {
        return extractList.slice(start, end).filter(item => {
            return (item.extractName.indexOf(extractName) !== -1) &&
                (item.purpose.indexOf(purpose) !== -1) &&
                (item.finalExtractPerson.indexOf(finalExtractPerson) !== -1);
        });
    },
    totalOfRosterList(finalExtractPerson = '') {
        return rosterList.filter(item => {
            return item.finalExtractPerson.indexOf(finalExtractPerson) !== -1;
        }).length;
    },
    queryRosterList(start = 0, end = 10, finalExtractPerson = '') {
        return rosterList.slice(start, end).filter(item => {
            return item.finalExtractPerson.indexOf(finalExtractPerson) !== -1;
        });
    },
    totalOfRecordList(operator = '') {
        return recordList.filter(item => {
            return item.operator.indexOf(operator) !== -1;
        }).length;
    },
    queryRecordList(start = 0, end = 10, operator = '') {
        return recordList.slice(start, end).filter(item => {
            return item.operator.indexOf(operator) !== -1;
        });
    }
};

var extractList = [];
for (let i = 0; i < 50; ++i) {
    extractList.push({
        'id': uuid.v1(),
        // 提取名
        'extractName': `超过2个月没有付费的中r以上玩家_${i+1}`,
        // 目的
        'purpose': '发礼包',
        // 最新的提取状态
        'latestExtractState': '成功',
        // 最新提取是否查/载
        'processProgress': '未处理',
        // 最后开始提取时间
        'finalExtractTime': '2019-01-16 12:10:55',
        // 最后提取人
        'finalExtractPerson': '李某某',
        // 提取方式
        'extractMode': 'manual', // manual: 手动, auto: 自动(可能是定时提取的)
        // 定时
        'scheduledTime': '周二,三  09:10'
    });
}

var rosterList = [];
for (let i = 0; i < 50; ++i) {
    rosterList.push({
        'id': uuid.v1(),
        // 最后开始提取时间
        'finalExtractTime': '2019-01-16 12:10:55',
        // 最后提取人
        'finalExtractPerson': '李某某',
        // 提取方式
        'extractMode': 'manual', // manual: 手动, auto: 自动(可能是定时提取的)
    });
}

var recordList = [];
for (let i = 0; i < 50; ++i) {
    recordList.push({
        'id': uuid.v1(),
        // 操作时间
        'operationTime': '2019-01-16 12:10:55',
        // 操作人
        'operator': '李某某',
        // 操作
        'operation': '保存+提取'
    });
}