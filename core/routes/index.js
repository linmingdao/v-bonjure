import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用VueRouter统一管理应用路由
Vue.use(VueRouter);

// 应用路由器
export let appRouter = null;

/**
 * 导出应用的路由配置函数
 * @param {Object} 应用的 路由信息 和 公共路由配置信息
 * @param {Enmu} 路由模式 hash | history
 */
export const configAppRoutes = (routes = [], mode) => {
    appRouter = new VueRouter({
        mode,
        routes: routes
    });
    return appRouter;
};
