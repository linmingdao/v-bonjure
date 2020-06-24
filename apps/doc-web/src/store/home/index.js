import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import Logger from '@core/logger';

const logger = Logger.getLogger('app/store/home');

export default {
    namespaced: true,
    state: {
        ...state(logger)
    },
    getters: {
        ...getters(logger)
    },
    mutations: {
        ...mutations(logger)
    },
    actions: {
        ...actions(logger)
    }
};
