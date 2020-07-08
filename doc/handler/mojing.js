const mojingDao = require('../database/mojingDao');
const response = require('../utils/response');
const STATUS_CODE = require('../constants/statusCode');

module.exports = {
    getExtractList({ pageSize, pageNumber, extractName, purpose, finalExtractPerson }) {
        const end = pageNumber * pageSize;
        const start = end - pageSize;
        return response.body(STATUS_CODE.REQUEST_OK, 'token未过期,返回ExtractList', {
            total: mojingDao.totalOfExtractList(extractName, purpose, finalExtractPerson),
            list: mojingDao.queryExtractList(start, end, extractName, purpose, finalExtractPerson)
        });
    },
    getRosterList({ pageSize, pageNumber, finalExtractPerson }) {
        const end = pageNumber * pageSize;
        const start = end - pageSize;
        return response.body(STATUS_CODE.REQUEST_OK, 'token未过期,返回RosterList', {
            total: mojingDao.totalOfRosterList(finalExtractPerson),
            list: mojingDao.queryRosterList(start, end, finalExtractPerson)
        });
    },
    getRecordList({ pageSize, pageNumber, operator }) {
        const end = pageNumber * pageSize;
        const start = end - pageSize;
        return response.body(STATUS_CODE.REQUEST_OK, 'token未过期,返回RecordList', {
            total: mojingDao.totalOfRecordList(operator),
            list: mojingDao.queryRecordList(start, end, operator)
        });
    }
};