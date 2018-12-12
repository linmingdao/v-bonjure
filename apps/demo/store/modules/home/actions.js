import { getTodolist } from '../../../net/home';
import { MUTATIONS, ACTIONS } from '../../../constants/storeTypes.js';

export default function() {
    return {
        // 使用async函数，避免嵌套层次过深，异步流同步的写法
        async [ACTIONS.GET_TODOLIST]({ dispatch, commit, getters, rootGetters, rootState }) {
            // Step_1: Http网络请求
            const response = await getTodolist();

            // Step_2: 初始化todolist
            commit(`${MUTATIONS.INIT_TODOLIST}`, response.data.todos);
        }
    }
};