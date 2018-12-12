import Http from '@vbonjour/Http';
import notificator from '@vbonjour/notificator';
import tree from '@vbonjour/components/example/tree/index.vue';
import Logger from '@vbonjour/Logger';
import { createNamespacedHelpers } from 'vuex';
import { MODULES, MUTATIONS, ACTIONS } from '../../constants/storeTypes.js';

// 划分一级模块
// import { mapState } from 'vuex';
// const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers(`${MODULES.HOME}`);

// 划分到更细的模块(注意：每个模块都是namespaced)
const counterMap = createNamespacedHelpers(`${MODULES.HOME}/${MODULES.COUNTER}`);
const todoMap = createNamespacedHelpers(`${MODULES.HOME}/${MODULES.TODO_LIST}`);

let contextFlags = {
    'color': 'on',
    'level': 'on',
    'module': 'on',
    'time': 'on'
};

let moduleSwitch = {
    'Global': 'on',
    'UIComponents': 'on',
    'UIComponents/GroupBox': 'on',
    'UIComponents/GroupBox/A': 'on',
    'UIComponents/GroupBox/A/B': 'on'
};

export default {
    // 组件的本地状态
    data() {
        return {
            newTodoText: '',
            loggerSettings: {
                logLevel: 'debug',
                color: 'on',
                module: 'on',
                time: 'on',
                level: 'on',
                offModules: '无'
            }
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
        // 消息中心测试方法
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
        // http测试方法
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
        testRESTfulApiMethod(method) {

        },
        // 日志测试方法
        testLogLevel(level) {
            sherrylevel(level);
            this.$set(this.loggerSettings, 'logLevel', level);
        },
        testLogSwitch(switchName, status) {
            this.$set(this.loggerSettings, switchName, status);
            contextFlags[switchName] = status;
            sherry(Object.keys(contextFlags).filter(name => contextFlags[name] === 'on'));
        },
        testModuleSwitch(moduleName, status) {
            moduleSwitch[moduleName] = status;
            const offModules = Object.keys(moduleSwitch).filter(name => moduleSwitch[name] === 'off').join(', ');
            this.$set(this.loggerSettings, 'offModules', offModules === '' ? '无' : offModules);
            if (status === 'on') {
                sherryon(moduleName);
            } else {
                sherryoff(moduleName);
            }
        },
        testLog(level) {
            const logger_Global = Logger.getLogger(); // 不指定模块名称会输出到'global'全局模块
            const logger_App_Main = Logger.getLogger('App/Main');
            const logger_App_Timeline = Logger.getLogger('App/Timeline');
            const logger_UIComponent = Logger.getLogger('UIComponents');
            const logger_UIComponent_Button = Logger.getLogger('UIComponents/Button');
            const logger_UIComponent_Select = Logger.getLogger('UIComponents/Select');
            const logger_UIComponent_GroupBox = Logger.getLogger('UIComponents/GroupBox');
            const logger_UIComponent_GroupBox_A = Logger.getLogger('UIComponents/GroupBox/A');
            const logger_UIComponent_GroupBox_A_B = Logger.getLogger('UIComponents/GroupBox/A/B');
            (function run() {
                var args = Array.prototype.slice.call(arguments);
                args.forEach(function(logger) {
                    logger[level]('这是一条日志哟: ', [1, 2, 3, 4], '消息对象: ', { j: 'j', k: 'k', h: { a: 'a', b: 'b' } });
                });
            }(
                logger_Global,
                logger_App_Main,
                logger_App_Timeline,
                logger_UIComponent,
                logger_UIComponent_Button,
                logger_UIComponent_Select,
                logger_UIComponent_GroupBox,
                logger_UIComponent_GroupBox_A,
                logger_UIComponent_GroupBox_A_B
            ));
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