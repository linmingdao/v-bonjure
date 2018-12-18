import { MUTATIONS } from '../../../constants/storeTypes.js';

export default function(logger) {
    return {
        [MUTATIONS.INIT_TODOLIST]: (state, todolist = []) => {
            state.todos = [...todolist];
            logger.debug(`初始化了todolist`, todolist);
        }
    };
};