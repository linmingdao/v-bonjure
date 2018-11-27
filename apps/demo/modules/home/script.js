import { createNamespacedHelpers } from 'vuex';
import { MODULES, MUTATIONS } from '../../store/types.js';
// 导入公共组件
import tree from 'baseComponents/example/tree/index.vue';

// 划分一级模块
// import { mapState } from 'vuex';
// const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers(`${MODULES.HOME}`);

// 划分到更细的模块(注意：每个模块都是namespaced)
const counterMap = createNamespacedHelpers(`${MODULES.HOME}/${MODULES.COUNTER}`);
const todoMap = createNamespacedHelpers(`${MODULES.HOME}/${MODULES.TODO_LIST}`);

export default {
    // 组件的本地状态
    data() {
        return {
            newTodoText: ''
        };
    },
    // 注册组件
    components: {
        tree
    },
    // 本地状态的计算属性，Store中的state、getters
    computed: {
        ...counterMap.mapState(['count']),
        ...counterMap.mapGetters(['countWithRmbPrefix']),
        ...todoMap.mapState(['todos']),
        ...todoMap.mapGetters(['doneTodosCount', 'undoneTodosCount', 'sortedTodos']),
    },
    // 本地方法、Store中的mutations、actions
    methods: {
        ...counterMap.mapMutations([
            MUTATIONS.INCREMENT,
            MUTATIONS.DECREMENT
        ]),
        ...todoMap.mapMutations([
            MUTATIONS.ADD_TODO,
            MUTATIONS.DELETE_TODO,
            MUTATIONS.FINISH_TODO
        ])
    }
};