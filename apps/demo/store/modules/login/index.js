import actions from './actions';
import mutations from './mutations';
import Logger from 'logger';

const logger = Logger.getLogger('App/Store/Login');

/**
 * 登录模块状态
 */
export default {
    // 开启命名空间
    namespaced: true,
    // 状态
    state: {
        pending: false
    },
    // 同步操作，直接操作state
    mutations: {
        ...mutations(logger)
    },
    // 异步操作，Action 提交的是 mutation，而不是直接变更状态
    actions: {
        ...actions(logger)
    }
};