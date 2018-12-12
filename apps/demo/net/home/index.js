import * as API from '../api';
import httpClient from '../httpClient';

/**
 * 获取todolist列表
 * @param {String} token 
 */
export async function getTodolist() {
    // Step_1: 发起请求
    // NOTE: 网络层，只负责发送请求与接收请求，对请求返回的数据做二次计算应当是业务层的职责
    const response = await httpClient.get(API.TODOLIST);

    // Step_2: 返回响应数据
    return response;
};