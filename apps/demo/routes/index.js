// 导入权限相关的校验模块
import { authorize } from './authority';
// 业务模块
import modules from '../modules';
// 导入公共组件
import Page404 from 'baseComponents/example/404/index.vue';

/**
 * 路由配置(模块不一定都要加入到路由中)
 */
export default [
    // 首页模块
    {
        path: '/',
        component: modules['Home'],
        beforeEnter: (to, from, next) => authorize(to, from, next)
    },
    // 首页模块
    {
        path: '/home',
        component: modules['Home'],
        beforeEnter: (to, from, next) => authorize(to, from, next)
    },
    // 登录模块
    {
        path: '/login',
        component: modules['Login']
    },
    // 404模块
    {
        path: '/404',
        component: Page404
    }
];