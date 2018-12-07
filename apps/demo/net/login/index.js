import Http from 'http';
import * as API from '../api';

// 获取并配置一个http请求的客户端实例
const httpClient = Http.getClient().disableLoading();

/**
 * 发起登录请求
 * @param {*} param0 
 */
export async function doLogin({ username, password }) {
    // Step_1: 发起请求
    const response = await httpClient.post(API.LOGIN, { username, password });
    
    // Step_2: 返回响应数据
    return response;
};