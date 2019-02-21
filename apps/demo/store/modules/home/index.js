import Logger from '@core/Logger';
import actions from './actions';
import mutations from './mutations';
import { MODULES, MUTATIONS } from '../../../constants/storeTypes.js';

const logger = Logger.getLogger('App/Store/Home');

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
                todos: []
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
                ...mutations(logger)
            },
            actions: {
                ...actions(logger)
            }
        }
    }
};