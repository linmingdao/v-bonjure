import { createNamespacedHelpers } from 'vuex';
import { MODULES, MUTATIONS, ACTIONS } from '../../../../constants/storeTypes.js';

// 划分到更细的模块(注意：每个模块都是namespaced)
const todoMap = createNamespacedHelpers(`${MODULES.HOME}/${MODULES.TODO_LIST}`);

export default {
    // 组件的本地状态
    data() {
        return {
            newTodoText: ''
        }
    },
    // 本地状态的计算属性，Store中的state、getters
    computed: {
        ...todoMap.mapState(['todos']),
        ...todoMap.mapGetters(['doneTodosCount', 'undoneTodosCount', 'sortedTodos'])
    },
    // 本地方法、Store中的mutations、actions
    methods: {
        resetTodoList() {
            this[ACTIONS.GET_TODOLIST]();
        },
        ...todoMap.mapMutations([
            MUTATIONS.ADD_TODO,
            MUTATIONS.DELETE_TODO,
            MUTATIONS.FINISH_TODO
        ]),
        ...todoMap.mapActions([ACTIONS.GET_TODOLIST])
    },
    mounted() {
        // 方案1：请求todolist,todolist是需要缓存在store中的,又是异步流,所以需要走action流程
        // 方案2：当然也可以是：视图层发起网络请求Todolist列表数据，对结果异常处理，无异常调用相应的Mutation初始化Todolist
        this[ACTIONS.GET_TODOLIST]();
    }
};