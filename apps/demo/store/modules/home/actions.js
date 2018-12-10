import { getTodolist } from '../../../net/home';
import { MUTATIONS, ACTIONS } from '../../types.js';

export default function() {
    return {
        // 使用async函数，拒绝任何形式的嵌套，异步流同步的写法
        async [ACTIONS.GET_TODOLIST]({ dispatch, commit, getters, rootGetters, rootState }) {
            // Step_1: Http网络请求
            const response = await getTodolist();
            // 非异步的形式，返回的是 Promise ，则需要嵌套写法，可能会出现回调地狱
            // getTodolist().then(response => {
            //     commit(`${MUTATIONS.INIT_TODOLIST}`, response.data.todos);
            // });

            // Step_2: 初始化todolist
            commit(`${MUTATIONS.INIT_TODOLIST}`, response.data.todos);
        }
    }
};