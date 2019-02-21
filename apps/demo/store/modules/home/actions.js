import { getTodolist, addTodo, deleteTodo, updateTodo } from '../../../handlers/home';
import { MUTATIONS, ACTIONS } from '../../../constants/storeTypes.js';

export default function() {
    return {
        // 使用async函数，避免嵌套层次过深，异步流同步的写法
        async [ACTIONS.GET_TODOLIST]({ commit }) {
            // Step_1: Http网络请求
            const response = await getTodolist();
            // Step_2: 初始化todolist
            commit(`${MUTATIONS.INIT_TODOLIST}`, response.data.todos);
        },
        // 新增todo
        async [ACTIONS.ADD_TODO]({ commit }, payload) {
            const response = await addTodo(payload);
            commit(`${MUTATIONS.INIT_TODOLIST}`, response.data.todos);
        },
        // 删除todo
        async [ACTIONS.DELETE_TODO]({ commit }, payload) {
            const response = await deleteTodo(payload);
            commit(`${MUTATIONS.INIT_TODOLIST}`, response.data.todos);
        },
        // 更新todo为已完成状态
        async [ACTIONS.FINISH_TODO]({ commit }, payload) {
            const response = await updateTodo(payload);
            commit(`${MUTATIONS.INIT_TODOLIST}`, response.data.todos);
        }
    };
};