// 导入公共组件
import components from '../components';

/**
 * 公共路由配置
 */
const publicRoutes = {
    // 404 page
    page404: {
        path: '/404',
        component: components['Page404']
    }
};

/**
 * 生产公共路由信息
 * @param {Object} config 
 */
export const producePublicRoutes = (config) => {
    const routes = [];
    if (config['usePublicRoutes']) {
        if (config['use404Route']) {
            routes.push(publicRoutes['page404']);
        }
    }
    return routes;
};