import { MUTATIONS, ACTIONS } from './types';
import Logger from 'logger';

const logger = Logger.getLogger('Global/Store');

/**
 * 配置全局Store
 */
export default {
    state: {
        // 标识全局loading状态
        pending: false,
        // 消息中心待显示的消息内容
        message: 'test alert'
    },
    getters: {},
    mutations: {
        [MUTATIONS.ENABLE_PENDING]: state => {
            state.pending = true;
            logger.debug('将应用置为 pending 状态');
        },
        [MUTATIONS.DISABLE_PENDING]: state => {
            state.pending = false;
            logger.debug('将应用置为 idle 状态');
        }
    }
};