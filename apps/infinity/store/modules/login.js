import { MODULES, MUTATIONS, ACTIONS } from '../types.js';

/**
 * 登录(Login)模块状态
 */
export default {
    namespaced: true,
    state: {
        username: '',
        password: '',
        remeber: false
    }
};