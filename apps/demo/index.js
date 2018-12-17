// 导入框架提供的App启动函数
import App from '@core/App';
// 导入应用的状态
import store from './store';
// 路由配置
import routes from './routes';

/**
 * 1、告诉通用框架你的应用相关信息(必选)：
 * (1)顶层路由配置信息
 * (2)应用状态配置信息
 * 
 * 2、框架会启动你的Application
 */
App({
    store,
    routes
});