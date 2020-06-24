export default {
    data() {
        return {
            tableData: [
                {
                    server: '3服不区分平台',
                    serverStatus: '正常',
                    startServerTime: '2019-03-21 12:00:14',
                    beginImportTime: '2019-03-21 13:02:09',
                    stopImportTime: '2019-03-21 13:02:09',
                    fullImportTime: '2019-03-21 13:02:09',
                    serverTotalImport: '26.16% (61467/235000)不按规则导量: android-7, ios-0',
                    country: 'EN',
                    android: '15.43%(1543/10000)',
                    ios: '18.18%(1818/10000)',
                    gross: '33.64% (3361/10000)',
                    importPercentage: '5.47%(3361/61460)'
                },
                {
                    server: '3服不区分平台',
                    serverStatus: '正常',
                    startServerTime: '2019-03-21 12:00:14',
                    beginImportTime: '2019-03-21 13:02:09',
                    stopImportTime: '2019-03-21 13:02:09',
                    fullImportTime: '2019-03-21 13:02:09',
                    serverTotalImport: '26.16% (61467/235000)不按规则导量: android-7, ios-0',
                    country: 'BH',
                    android: '15.43%(1543/10000)',
                    ios: '18.18%(1818/10000)',
                    gross: '33.64% (3361/10000)',
                    importPercentage: '5.47%(3361/61460)'
                },
                {
                    server: '3服不区分平台',
                    serverStatus: '正常',
                    startServerTime: '2019-03-21 12:00:14',
                    beginImportTime: '2019-03-21 13:02:09',
                    stopImportTime: '2019-03-21 13:02:09',
                    fullImportTime: '2019-03-21 13:02:09',
                    serverTotalImport: '26.16% (61467/235000)不按规则导量: android-7, ios-0',
                    country: 'DZ',
                    android: '15.43%(1543/10000)',
                    ios: '18.18%(1818/10000)',
                    gross: '33.64% (3361/10000)',
                    importPercentage: '5.47%(3361/61460)'
                },
                {
                    server: '3服不区分平台',
                    serverStatus: '正常',
                    startServerTime: '2019-03-21 12:00:14',
                    beginImportTime: '2019-03-21 13:02:09',
                    stopImportTime: '2019-03-21 13:02:09',
                    fullImportTime: '2019-03-21 13:02:09',
                    serverTotalImport: '26.16% (61467/235000)不按规则导量: android-7, ios-0',
                    country: '总量',
                    android: '15.43%(1543/10000)',
                    ios: '18.18%(1818/10000)',
                    gross: '33.64% (3361/10000)',
                    importPercentage: '5.47%(3361/61460)'
                },
                {
                    server: '2服不区分平台',
                    serverStatus: '正常',
                    startServerTime: '2019-03-21 12:00:14',
                    beginImportTime: '2019-03-21 13:02:09',
                    stopImportTime: '2019-03-21 13:02:09',
                    fullImportTime: '2019-03-21 13:02:09',
                    serverTotalImport: '26.16% (61467/235000)不按规则导量: android-7, ios-0',
                    country: 'AE',
                    android: '15.43%(1543/10000)',
                    ios: '18.18%(1818/10000)',
                    gross: '33.64% (3361/10000)',
                    importPercentage: '5.47%(3361/61460)'
                },
                {
                    server: '2服不区分平台',
                    serverStatus: '正常',
                    startServerTime: '2019-03-21 12:00:14',
                    beginImportTime: '2019-03-21 13:02:09',
                    stopImportTime: '2019-03-21 13:02:09',
                    fullImportTime: '2019-03-21 13:02:09',
                    serverTotalImport: '26.16% (61467/235000)不按规则导量: android-7, ios-0',
                    country: 'BH',
                    android: '15.43%(1543/10000)',
                    ios: '18.18%(1818/10000)',
                    gross: '33.64% (3361/10000)',
                    importPercentage: '5.47%(3361/61460)'
                },
                {
                    server: '2服不区分平台',
                    serverStatus: '正常',
                    startServerTime: '2019-03-21 12:00:14',
                    beginImportTime: '2019-03-21 13:02:09',
                    stopImportTime: '2019-03-21 13:02:09',
                    fullImportTime: '2019-03-21 13:02:09',
                    serverTotalImport: '26.16% (61467/235000)不按规则导量: android-7, ios-0',
                    country: 'DZ',
                    android: '15.43%(1543/10000)',
                    ios: '18.18%(1818/10000)',
                    gross: '33.64% (3361/10000)',
                    importPercentage: '5.47%(3361/61460)'
                },
                {
                    server: '2服不区分平台',
                    serverStatus: '正常',
                    startServerTime: '2019-03-21 12:00:14',
                    beginImportTime: '2019-03-21 13:02:09',
                    stopImportTime: '2019-03-21 13:02:09',
                    fullImportTime: '2019-03-21 13:02:09',
                    serverTotalImport: '26.16% (61467/235000)不按规则导量: android-7, ios-0',
                    country: '总量',
                    android: '15.43%(1543/10000)',
                    ios: '18.18%(1818/10000)',
                    gross: '33.64% (3361/10000)',
                    importPercentage: '5.47%(3361/61460)'
                }
            ]
        };
    },
    methods: {
        handleEdit(index, data) {
            console.log(index);
        },
        handleStop(index, data) {
            console.log(index);
        },
        handleView(index, data) {
            console.log(index);
        },
        handleRecord(index, data) {
            console.log(index);
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if ([0, 1, 2, 3, 4, 5, 6, 7, 13].includes(columnIndex)) {
                if (rowIndex % 4 === 0) {
                    return {
                        rowspan: 4,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        }
    }
};
