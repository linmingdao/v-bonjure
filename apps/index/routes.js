// 业务组件
import components from './components';

// 路由配置
export default [
    // 首页
    {
        path: '/',
        component: components['Home']
    },
    // 首页
    {
        path: '/home',
        component: components['Home']
    },
    // 登录页
    {
        path: '/login',
        component: components['Login']
    }
];