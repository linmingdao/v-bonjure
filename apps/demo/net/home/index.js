import Http from 'http';
import * as localStorageHelper from '../../utils/localStorageHelper';
import * as API from '../api';

// 获取一个http请求的客户端实例
// NOTE: 若很多地方都需要请求携带token、cookie信息，则可以自己在框架提供的http的基础上再封装一个
const httpClient = Http.getClient();

/**
 * 获取todolist列表
 * @param {String} token 
 */
export async function getTodolist() {
    // Step_1: 发起请求
    // NOTE: 网络层，只负责发送请求与接收请求，对请求返回的数据做二次计算应当是业务层的职责
    const response = await httpClient.headers({ 'token': localStorageHelper.get('token') }).get(API.TODOLIST);

    // Step_2: 返回响应数据
    return response;
};