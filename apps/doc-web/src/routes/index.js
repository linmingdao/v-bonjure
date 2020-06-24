import modules from '@app/modules';

export default [
    {
        path: '/',
        component: modules['home']
    },
    {
        path: '/home',
        component: modules['home']
    },
    {
        path: '/core',
        component: modules['core']
    },
    {
        path: '/widget',
        component: modules['widget']
    },
    {
        path: '/summary',
        component: modules['summary']
    }
];
