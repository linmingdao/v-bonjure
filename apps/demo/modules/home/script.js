import Http from '@vbonjour/Http';
import notificator from '@vbonjour/notificator';
import tree from '@vbonjour/components/example/tree/index.vue';
import { createNamespacedHelpers } from 'vuex';
import { MODULES, MUTATIONS, ACTIONS } from '../../constants/storeTypes.js';

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
        ...todoMap.mapGetters(['doneTodosCount', 'undoneTodosCount', 'sortedTodos'])
    },
    // 本地方法、Store中的mutations、actions
    methods: {
        showLoading() {
            notificator.showLoading({ text: '我是loading动画...' });
            setTimeout(() => notificator.hideLoading(), 3000);
        },
        showAlert() {
            // notificator.alert('这是消息内容', {
            //     callback: action => {
            //         console.log(action);
            //     }
            // });
            // notificator.alertInfo('这是消息内容');
            // notificator.alertWarning('这是消息内容');
            notificator.alertSuccess('这是消息内容');
            // notificator.alertError('这是消息内容');
        },
        showConfirm() {
            notificator.confirm('此操作将永久删除该文件, 是否继续?', {
                callback: action => {
                    console.log(action);
                }
            });
        },
        showMessage() {
            // notificator.message('这是消息内容');
            // notificator.messageInfo('这是消息内容');
            notificator.messageWarning('这是消息内容');
            // notificator.messageSuccess('这是消息内容');
            // notificator.messageError('这是消息内容');
        },
        resetTodoList() {
            this[ACTIONS.GET_TODOLIST]();
        },
        testDefaultHttpExceptionHandler(type) {
            if (type === 404) {
                Http.getClient().get('/exception_404');
            } else {
                Http.getClient().get('/exception_500');
            }
        },
        testCustomHttpExceptionHandler(type) {
            const customHttpClient = Http.getClient().error(err => {
                notificator.messageError(`${err.status} ${err.statusText}：${err.url}`);
                // 返回true, 代表不使用http模块默认的异常处理
                return true;
            });
            if (type === 404) {
                customHttpClient.get('/exception_404');
            } else {
                customHttpClient.get('/exception_500');
            }
        },
        ...counterMap.mapMutations([
            MUTATIONS.INCREMENT,
            MUTATIONS.DECREMENT
        ]),
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