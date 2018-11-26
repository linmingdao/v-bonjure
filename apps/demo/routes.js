// 业务组件
import components from './components';

/**
 * 授权验证
 */
const authorize = (to, from, next) => {
    if (true) {
        next();
    } else {
        next({ path: '/login' });
    }
};

/**
 * 路由配置
 */
export default [
    // 首页
    {
        path: '/',
        component: components['Home'],
        beforeEnter: (to, from, next) => authorize(to, from, next)
    },
    // 首页
    {
        path: '/home',
        component: components['Home'],
        beforeEnter: (to, from, next) => authorize(to, from, next)
    },
    // 登录页
    {
        path: '/login',
        component: components['Login']
    }
];