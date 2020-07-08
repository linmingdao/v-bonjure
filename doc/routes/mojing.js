const mojingHander = require('../handler/mojing');

module.exports = {
    install(app) {
        // 获取提数列表
        app.get('/extractList', (req, res) => {
            console.log('request extractList:');
            const queryObj = req.query;
            const pageSize = parseInt(queryObj['pageSize']);
            const pageNumber = parseInt(queryObj['pageNumber']);
            const convertedQueryObj = {
                ...queryObj,
                pageSize,
                pageNumber
            };
            console.log(convertedQueryObj)
            res.json(JSON.stringify(mojingHander.getExtractList(convertedQueryObj)));
            res.end();
            console.log(`=======================================`);
        });
        // 获取名单列表
        app.get('/rosterList', (req, res) => {
            console.log('request rosterList:');
            const queryObj = req.query;
            const pageSize = parseInt(queryObj['pageSize']);
            const pageNumber = parseInt(queryObj['pageNumber']);
            const convertedQueryObj = {
                ...queryObj,
                pageSize,
                pageNumber
            };
            console.log(convertedQueryObj)
            res.json(JSON.stringify(mojingHander.getRosterList(convertedQueryObj)));
            res.end();
            console.log(`=======================================`);
        });
        // 获取操作记录列表
        app.get('/recordList', (req, res) => {
            console.log('request recordList:');
            const queryObj = req.query;
            const pageSize = parseInt(queryObj['pageSize']);
            const pageNumber = parseInt(queryObj['pageNumber']);
            const convertedQueryObj = {
                ...queryObj,
                pageSize,
                pageNumber
            };
            console.log(convertedQueryObj)
            res.json(JSON.stringify(mojingHander.getRecordList(convertedQueryObj)));
            res.end();
            console.log(`=======================================`);
        });
    }
};