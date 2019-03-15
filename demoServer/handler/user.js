const utils = require('../utils/utils');
const userDao = require('../database/userDao');
const tokenUtils = require('../utils/tokenUtils');
const response = require('../utils/response');
const STATUS_CODE = require('../constants/statusCode');

module.exports = {
    before(token, mocksleep = false) {
        // 模拟睡眠
        mocksleep && utils.mockSleep();
        // 检测token是否过期
        if (this.checkTokenIsExpired(token)) {
            console.log(`token: ${token} 过期`);
            return response.body(STATUS_CODE.TOKEN_EXPIRED, 'token过期,请重新登录');
        } else {
            console.log(`token: ${token} 未过期`);
            return null;
        }
    },
    checkTokenIsExpired(token) {
        return tokenUtils.isExpired(token);
    },
    getUserList({ token, pageSize, pageNumber, username, province }) {
        const result = this.before(token, true);
        if (!result) {
            const end = pageNumber * pageSize;
            const start = end - pageSize;
            console.log(`start:${start}, end:${end}`);
            // token未过期，返回todolist
            return response.body(STATUS_CODE.REQUEST_OK, 'token未过期,返回userList', {
                total: userDao.total(),
                userList: userDao.queryList(start, end, username, province)
            });
        } else {
            // token过期
            return result;
        }
    },
    addUser({ token, userInfo }) {
        const result = this.before(token);
        if (!result) {
            userDao.addUser(userInfo);
            console.log(`新增了user: ${userInfo.name}`);
            return response.body(STATUS_CODE.REQUEST_OK, 'token未过期,返回userList', { userList: userDao.queryList() });
        } else {
            return result;
        }
    },
    deleteUser({ token, userId }) {
        const result = this.before(token);
        if (!result) {
            userDao.deleteById(userId);
            console.log(`删除了user, userid: ${userId}`);
            return response.body(STATUS_CODE.REQUEST_OK, 'token未过期,返回userList', { userList: userDao.queryList() });
        } else {
            return result;
        }
    },
    deleteUserInBulk({ token, userIdList }) {
        const result = this.before(token);
        if (!result) {
            userDao.deleteByIdList(userIdList);
            console.log(`批量删除了user, userid: ${userIdList}`);
            return response.body(STATUS_CODE.REQUEST_OK, 'token未过期,返回userList', { userList: userDao.queryList() });
        } else {
            return result;
        }
    },
    updateUser({ token, userId, userInfo }) {
        const result = this.before(token);
        if (!result) {
            userDao.updateById(userId, userInfo);
            console.log(`更新了user: ${userId}`);
            return response.body(STATUS_CODE.REQUEST_OK, 'token未过期,返回userList', { userList: userDao.queryList() });
        } else {
            return result;
        }
    }
};