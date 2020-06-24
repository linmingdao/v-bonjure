import Logger from '@core/logger';
// 状态
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const logger = Logger.getLogger('app/store/global');

export default {
    state: { ...state(logger) },
    getters: { ...getters(logger) },
    mutations: { ...mutations(logger) },
    actions: { ...actions(logger) }
};
