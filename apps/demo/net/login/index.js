import Http from '@core/Http';
import * as LOGIN_API from '../../api/login';
import * as localStorageHelper from '../../utils/localStorageHelper';

/**
 * 发起登录请求
 * @param {*} param0 
 */
export async function login({ username, password }) {
    // Step_1: 发起请求
    const response = await Http.getClient().headers({ 'token': localStorageHelper.get('token') }).disableLoading().post(LOGIN_API.LOGIN, { username, password });

    // Step_2: 返回响应数据
    return response;
};