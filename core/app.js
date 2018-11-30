import "babel-polyfill";
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
import Logger from 'logger';

const logger = Logger.getLogger('Global');

/**
 * 应用的启动入口，需要应用开发者在入口处手动调用
 * 注意模板中的root节点会被Vue替换掉，不会出现在文档中，应用都挂载在app节点下
 */
export default application => {
    // try {
    new Vue({
        // Vue实例的挂载点
        el: '#root',
        // 配置应用的状态树信息
        store: configAppStore(application.store),
        // 配置应用的路由信息
        router: configAppRoutes(application),
        // 渲染应用的挂载点
        render: h => h(App)
    });
    //     logger.debug('应用启动成功');
    // } catch (err) {
    //     logger.error('应用启动过程出错了', err);
    // };
};