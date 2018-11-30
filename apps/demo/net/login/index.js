import Logger from 'logger';
const logger = Logger.getLogger('App/Net/Login');

/**
 * 发起登录请求
 * @param {*} param0 
 */
export async function doLogin({ username, password }) {
    logger.debug('执行登录请求', { username, password });
    // Step_1: 发起请求
    const rawResponse = await fetch('/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    // Step_2: 转换请求响应体为json数据
    let content = await rawResponse.json();
    content = JSON.parse(content);
    logger.debug('登录请求返回结果', content);

    // Step_3: 返回响应数据
    return content;
};