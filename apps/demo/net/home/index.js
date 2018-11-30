import Logger from 'logger';
const logger = Logger.getLogger('App/Net/Home');

/**
 * 获取todolist列表
 * @param {String} token 
 */
export async function getTodolist(token) {
    logger.debug('获取todolist列表', { token });
    // Step_1: 发起请求
    const rawResponse = await fetch('/todolist', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
    });

    // Step_2: 转换请求响应体为json数据
    let content = await rawResponse.json();
    content = JSON.parse(content);
    logger.debug('请求返回的todolist列表数据', content);

    // Step_3: 返回响应数据
    return content;
};