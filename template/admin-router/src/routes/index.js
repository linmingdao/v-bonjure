import { authorize } from './authority/index';
import menus from '@app/modules/menu.js';

let childrenRoute = [];
function getMenuRoute(menus) {
    menus.forEach(item => {
        if (item.children) {
            getMenuRoute(item.children);
        } else {
            childrenRoute.push({
                path: item.path,
                beforeEnter: (to, from, next) => authorize(to, from, next),
                component: item.component
            });
        }
    });
}

getMenuRoute(menus);

export default [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('@app/modules/home/index.vue'),
        beforeEnter: (to, from, next) => authorize(to, from, next)
    }
];
