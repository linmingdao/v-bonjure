const uuid = require('uuid');

// 默认的token过期时间
const DURATION = 1000 * 30; // 默认过期时间：30秒

// 缓存token信息
const tokenMap = {};

module.exports = {
    /**
     * 生成token信息
     * @param {Number} duration 过期时间(单位: 毫秒) , 默认值一分钟
     * @returns {String} token
     */
    genToken(duration = DURATION) {
        // 生成token
        const token = uuid.v4().replace(/-/g, '');
        // 服务端缓存token信息, 对应的值是该token对应的过期时间(毫秒)
        tokenMap[token] = (new Date().getTime() + Number(duration));

        return token;
    },
    /**
     * 判断token是否过期
     * @param {String} token 
     * @returns {Boolean} true: token过期, false: token未过期
     */
    isExpired(token) {
        const expiredDate = tokenMap[token];
        if (expiredDate) {
            if (expiredDate <= Date.now()) {
                // 删除过期的token
                delete tokenMap[token];
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
};