// 导入日志库
import Logger from 'logger';
import { MODULES, MUTATIONS, ACTIONS } from '../types.js';
const logger = new Logger('Store/Home');

/**
 * 首页(Home)模块状态
 */
export default {
    namespaced: true,
    // 嵌套模块
    modules: {
        // 计数器模块
        [MODULES.COUNTER]: {
            namespaced: true,
            state: {
                count: 0
            },
            getters: {
                countWithRmbPrefix: state => {
                    return `￥${state.count}`;
                }
            },
            mutations: {
                [MUTATIONS.INCREMENT]: (state, n) => {
                    state.count += n;
                    logger.debug(`计数器自增: ${n}`);
                },
                [MUTATIONS.DECREMENT]: (state, n) => {
                    state.count -= n;
                    logger.debug(`计数器自减: ${n}`);
                }
            }
        },
        // todo list模块
        [MODULES.TODO_LIST]: {
            // 应用的home模块的状态
            namespaced: true,
            state: {
                title: 'my plan',
                todos: [
                    { text: 'play games', done: true },
                    { text: 'sing songs', done: false },
                    { text: 'go shopping', done: true },
                    { text: 'go to bed', done: false },
                    { text: 'have midnight snack', done: false }
                ]
            },
            // 派生出的状态(计算状态)
            getters: {
                /**
                 * 对于模块内部的 mutation 和 getter，
                 * 接收的第一个参数是模块的局部状态对象
                 */
                doneTodos: state => state.todos.filter(todo => todo.done),
                undoneTodos: state => state.todos.filter(todo => !todo.done),
                sortedTodos: (state, getters) => [...getters.undoneTodos, ...getters.doneTodos],
                /**
                 * 对于模块内部的 getter，
                 * 根节点状态会作为第三个参数暴露出来
                 */
                doneTodosCount: (state, getters, rootState) => getters.doneTodos.length,
                undoneTodosCount: (state, getters, rootState) => getters.undoneTodos.length
            },
            /**
             * 处理同步的事务，提交mutation：store.commit('increment')
             */
            mutations: {
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
            },
            actions: {}
        }
    }
};