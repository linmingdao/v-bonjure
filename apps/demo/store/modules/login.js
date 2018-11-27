import { MODULES, MUTATIONS, ACTIONS } from '../types.js';
import Logger from 'logger';
const logger = new Logger('Store/Login');

/**
 * 登录(Login)模块状态
 */
export default {
    // 开启命名空间
    namespaced: true,
    // 状态
    state: {
        username: '',
        password: '',
        remeber: false,
        loading: false
    },
    // 同步操作，直接操作state
    mutations: {
        [MUTATIONS.SET_2_LODING_STATE]: state => {
            state.loading = true;
            logger.debug('将 “立即登录” 按钮置为loading状态');
        },
        [MUTATIONS.SET_2_NORMAL_STATE]: state => {
            state.loading = false;
            logger.debug('将 “立即登录” 按钮置为normal状态');
        }
    },
    // 异步操作，Action 提交的是 mutation，而不是直接变更状态
    actions: {
        [ACTIONS.LOGIN]({ dispatch, commit, getters, rootGetters }) {
            logger.debug('执行登录请求');
            commit(`${MUTATIONS.SET_2_LODING_STATE}`);
            // 模拟登录请求
            setTimeout(() => {
                logger.debug('登录请求返回结果');
                commit(`${MUTATIONS.SET_2_NORMAL_STATE}`);
            }, 3000);
        }
    }
};