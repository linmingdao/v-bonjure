// 通用框架提供的App启动函数
import App from 'app';
// 导入应用的状态
import store from './store/index.js';
// 路由配置
import routes from './routes.js';
// 业务组件
import components from './components';
// 日志框架测试脚本
import './loggerTest';

/**
 * 1、告诉通用框架你的应用相关信息(必选)：
 * (1)业务组件
 * (2)路由配置信息
 * (3)状态配置信息
 * 
 * 2、更改框架的行为配置(可选)：
 * (1)更改框架的提供的公共路由配置
 * (2)更改框架提供的公共状态树配置
 * 
 * 3、框架会启动你的Application
 */
App({
    components,
    store,
    routes,
    // /**
    //  * 可选配置，如果你想要更改框架默认提供的路由配置
    //  */
    // publicRoutesConfig: {
    //     usePublicRoutes: true,
    //     use404Route: true
    // }
});