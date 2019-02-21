// 引入该应用公用的组件
import helmet from '../../components/helmet/index.vue';
// 引入该模块的组件，组件是有层次的
import cardHttp from './components/card-http/index.vue';
import cardTree from './components/card-tree/index.vue';
import cardLogger from './components/card-logger/index.vue';
import cardNotification from './components/card-notification/index.vue';
import cardCounter from './components/card-counter/index.vue';
import cardTodolist from './components/card-todolist/index.vue';

export default {
    // 组件的本地状态
    data() {
        return {};
    },
    // 注册组件
    components: {
        helmet,
        'card-tree': cardTree,
        'card-http': cardHttp,
        'card-logger': cardLogger,
        'card-notification': cardNotification,
        'card-counter': cardCounter,
        'card-todolist': cardTodolist
    }
};