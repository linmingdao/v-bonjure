import Vue from 'vue';
import VueRouter from 'vue-router';
// 导入默认的公共路由配置
import configuration from './configuration';
// 导入公共路由生成函数
import { producePublicRoutes } from './publicRoutes';

// 使用VueRouter统一管理应用路由
Vue.use(VueRouter);

/**
 * 配置公共路由信息
 * @param {*} cfg 
 */
const configPublicRoutes = (cfg = {}) => {
    // 混入应用和默认的配置，应用的会覆盖默认的
    const mixedConfig = {
        ...configuration,
        ...cfg
    };
    // 生成公共路由配置
    return producePublicRoutes(mixedConfig);
};

/**
 * 导出应用的路由配置函数
 * @param {Object} 应用的 路由信息 和 公共路由配置信息 
 */
export const configAppRoutes = ({ routes = [], publicRoutesConfig = {} }) => {
    return new VueRouter({
        routes: [
            ...routes,
            ...configPublicRoutes(publicRoutesConfig)
        ]
    });
};