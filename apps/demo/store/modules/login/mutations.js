import { MUTATIONS } from '../../../constants/storeTypes.js';

export default function(logger) {
    return {
        [MUTATIONS.SET_2_LODING_STATE]: state => {
            state.pending = true;
            logger.debug('将 “立即登录” 按钮置为loading状态');
        },
        [MUTATIONS.SET_2_NORMAL_STATE]: state => {
            state.pending = false;
            logger.debug('将 “立即登录” 按钮置为normal状态');
        }
    };
};