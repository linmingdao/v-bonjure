const utils = require('../utils/utils');
const tokenUtils = require('../utils/tokenUtils');
const database = require('../database/database');
const STATUS_CODE = require('../constants/statusCode');

module.exports = {
    before() {
        // 模拟睡眠
        utils.mockSleep();
    },
    /**
     * 登录
     * @param {Object} param0 
     */
    login({ username, password }) {
        console.log(`username: ${username}, password: ${password}`);
        this.before();
        const user = database.findUserByName(username);
        if (user.password === password) {
            // 生成token
            const token = tokenUtils.genToken();

            // 返回结果
            return {
                code: STATUS_CODE.REQUEST_OK,
                msg: '登录成功',
                extra: {},
                data: {
                    token,
                    user
                }
            };
        } else {
            return {
                code: STATUS_CODE.LOGIN_FAILED,
                msg: '用户名或密码错误',
                extra: {},
                data: {},
            };
        }
    },
    /**
     * 检测token时候过期
     * @param {Objec} param0 
     */
    checkTokenIsExpired({ token }) {
        if (tokenUtils.isExpired(token)) {
            console.log(`token: ${token} 过期`);
            return {
                code: STATUS_CODE.TOKEN_EXPIRED,
                msg: 'token过期,请重新登录',
                data: {},
                extra: {}
            };
        } else {
            console.log(`token: ${token} 未过期`);
            return {
                code: STATUS_CODE.TOKEN_NOT_EXPIRED,
                msg: 'token未过期,返回todolist',
                data: {},
                extra: {}
            };
        }
    }
}