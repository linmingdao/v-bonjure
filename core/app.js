// Vuex和VueRouter依赖Promise
import 'es6-promise/auto';
import './polyfill/promise-finally';
import Vue from 'vue';
import Http from '@core/http';
import Logger from '@core/logger';
import { platform } from '@utils/platform';
import notificator from '@core/notificator';
import Notification from '@core/notification';
// 导入应用的路由配置函数
import { configAppRoutes } from './routes';
// 导入应用的状态配置函数
import { configAppStore } from './store';
// 导入应用的挂载组件(同时也是顶层路由组件)
import App from './app/index.vue';
// 导入设置日志级别的命令行函数
import { loggerLevel } from '@core/loggerCmder';
// 事件总线的初始化函数
import { enableEmitter, enableEventBus, enableFindComponents } from './communicate/index.js';

// 暴露到全局的基础能力
window.$Http = Http;
window.$Logger = Logger;
window['$platform'] = platform;
window.$notificator = notificator;
window.$Notification = Notification;

const logger = Logger.getLogger('global/app');

// 捕获vue执行过程未被捕获的异常信息
Vue.config.errorHandler = (err, vm, info) => {
    logger.error('捕获到异常信息: ', err, vm, info);
};

// 捕获网络请求异常过程的错误
window.addEventListener('unhandledrejection', function(e) {
    e.preventDefault();
    logger.error('捕获到异常信息: ', e.reason);
    return true;
});

// 根据不同环境设置日志的级别
const BUILD_MODE = process.env.BUILD_MODE;
const BUILD_ENV = process.env.BUILD_ENV;

// 应用包构建模式
if (BUILD_MODE === 'appBundle') {
    switch (BUILD_ENV) {
        case 'prod':
            logger.info(`${BUILD_ENV}环境构建模式, 设置日志级别为: error`);
            // 生产环境日志级别设置为: ERROR
            loggerLevel('error');
            break;
        case 'prep':
        case 'test':
        case 'dev':
            logger.info(`${BUILD_ENV}环境构建模式, 设置日志级别为: debug`);
            // 提审(预生产)、测试、开发环境日志级别设置为: DEBUG
            loggerLevel('debug');
            break;
        default:
            logger.info('未指定环境构建模式, 设置日志级别为: debug');
            loggerLevel('debug');
    }
} else {
    window.loggerConfig(['color', 'level', 'module', 'time']);
    logger.info(`开发模式, 忽略环境参数(env=${BUILD_ENV}), 统一设置日志级别为: debug`);
    // 非应用包构建模式，即本地开发模式日志级别设置为: DEBUG
    loggerLevel('debug');
}

// 启用组件发射器
enableEmitter();
// 启用事件总线能力
enableEventBus();
// 启用组件间的发现能力
enableFindComponents();

/**
 * 应用的启动入口，需要应用开发者在入口处手动调用
 * 注意模板中的root节点会被Vue替换掉，不会出现在文档中，应用都挂载在app节点下
 */
export default application => {
    let routes = Array.isArray(application.routes) ? application.routes : application.routes.routes;
    let mode = Array.isArray(application.routes) ? 'hash' : application.routes.mode;

    return new Vue({
        // Vue实例的挂载点
        el: '#root',
        // 配置应用的状态树信息
        store: configAppStore(application.store),
        // 配置应用的路由信息
        router: configAppRoutes(routes, mode),
        // 渲染应用的挂载点
        render: h => h(App)
    });
};

logger.info('启动应用');
