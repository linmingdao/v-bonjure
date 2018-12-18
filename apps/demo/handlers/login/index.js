import { login } from '../../net/login';
import * as localStorageHelper from '../../utils/localStorageHelper';

/**
 * 用户登录
 * @param {Object} userInfo 用户信息
 */
export async function handleLogin(userInfo) {
    // Step_1: 业务层调用网络层请求后端登录接口
    const response = await login(userInfo);
    // Step_2: 返回结果
    return response;
}

/**
 * 处理记住用户
 * @param {*} param0 
 */
export const handleRemeberUser = ({ token, remeber, userid, username, password }) => new Promise((resolve, reject) => {
    if (remeber) {
        localStorageHelper.set('remeber', true);
        localStorageHelper.set('username', username);
        localStorageHelper.set('password', password);
    } else {
        localStorageHelper.set('remeber', false);
        localStorageHelper.remove('username');
        localStorageHelper.remove('password');
    }
    localStorageHelper.set('userid', userid);
    localStorageHelper.set('token', token);
    resolve();
});

/**
 * 咨询是否记住用户了
 */
export const askRemeberMe = () => new Promise((resolve, reject) => {
    if (localStorageHelper.get('remeber') === 'true') {
        const username = localStorageHelper.get('username');
        const password = localStorageHelper.get('password');
        resolve({
            remeber: true,
            username,
            password
        });
    } else {
        localStorageHelper.remove('userid');
        localStorageHelper.remove('token');
        resolve({
            remeber: false
        });
    }
});