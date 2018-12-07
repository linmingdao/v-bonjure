import { getTodolist } from '../../../net/home';
import { GLOBAL, MUTATIONS, ACTIONS } from '../../types.js';

export default function(logger) {
    return {
        // 使用async函数，拒绝任何形式的嵌套，异步流同步的写法
        async [ACTIONS.GET_TODOLIST]({ dispatch, commit, getters, rootGetters, rootState }) {
            // Step_1: 将全局的pending标志位置为true，应用根据该标志显示loading效果
            commit(`${GLOBAL.MUTATIONS.ENABLE_PENDING}`, null, { root: true });

            // Step_2: Http网络请求
            const response = await getTodolist();
            // 非异步的形式，返回的是 Promise ，则需要嵌套写法，可能会出现回调地狱
            // getTodolist().then(response => {
            //     commit(`${MUTATIONS.INIT_TODOLIST}`, response.data.todos);
            // });

            // Step_3: 初始化todolist
            commit(`${MUTATIONS.INIT_TODOLIST}`, response.data.todos);

            // Step_4: 将全局的pending标志位置为false，应用根据该标志隐藏loading效果
            commit(`${GLOBAL.MUTATIONS.DISABLE_PENDING}`, null, { root: true });
        }
    }
};