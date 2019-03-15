import 'babel-polyfill';
// Vuex和VueRouter依赖Promise
import 'es6-promise/auto';
import Vue from 'vue';
// 导入默认的ui库(element-ui)
// import './ui-library';
// 导入应用的路由配置函数
import { configAppRoutes } from './routes';
// 导入应用的状态配置函数
import { configAppStore } from './store';
// 导入应用的挂载组件(同时也是顶层路由组件)
import App from './app/index.vue';
// 导入设置日志级别的命令行函数
import { loggerLevel } from '@core/LoggerCmder';

// 根据不同环境设置日志的级别
console.log(`当前运行环境: ${process.env.NODE_ENV}`);
const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV === 'production') {
    // 生产环境日志级别设置为: ERROR
    loggerLevel('error');
} else {
    // 其余环境日志级别设置为: DEBUG
    loggerLevel('debug');
}

/**
 * 应用的启动入口，需要应用开发者在入口处手动调用
 * 注意模板中的root节点会被Vue替换掉，不会出现在文档中，应用都挂载在app节点下
 */
export default application => new Vue({
    // Vue实例的挂载点
    el: '#root',
    // 配置应用的状态树信息
    store: configAppStore(application.store),
    // 配置应用的路由信息
    router: configAppRoutes(application.routes),
    // 渲染应用的挂载点
    render: h => h(App)
});