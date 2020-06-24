import { authorize } from './authority/index';

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
