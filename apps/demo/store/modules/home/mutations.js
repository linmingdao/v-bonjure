import { MUTATIONS } from '../../types.js';

export default function(logger) {
    return {
        [MUTATIONS.INIT_TODOLIST]: (state, todolist = []) => {
            state.todos = [...todolist];
            logger.debug(`初始化了todolist`, todolist);
        },
        [MUTATIONS.ADD_TODO]: (state, text) => {
            text.trim() !== '' && !state.todos.filter(item => item.text === text).length && state.todos.push({ text, done: false }) && logger.debug(`添加了todo: ${text}`);;
        },
        [MUTATIONS.DELETE_TODO]: (state, text) => {
            state.todos = state.todos.filter(todo => todo.text !== text);
            logger.debug(`删除了todo: ${text}`);
        },
        [MUTATIONS.FINISH_TODO]: (state, text) => {
            state.todos = state.todos.map(item => item.text === text ? {
                text: item.text,
                done: true
            } : item);
            logger.debug(`完成了todo: ${text}`);
        }
    };
};