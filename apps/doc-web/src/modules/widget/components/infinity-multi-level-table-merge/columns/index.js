import componentOperation from './operation/index';

export default [
    {
        prop: 'server',
        label: '服务器',
        width: 130
    },
    {
        prop: 'serverStatus',
        label: '服务器状态',
        width: 120
    },
    {
        prop: 'countryStatus',
        label: '国家导量状态',
        width: 120,
        children: [
            {
                prop: 'country',
                label: '国家',
                width: 120
            },
            {
                prop: 'android',
                label: 'android',
                width: 120
            },
            {
                prop: 'ios',
                label: 'ios',
                width: 120
            },
            {
                prop: 'gross',
                label: '总量',
                width: 120
            }
        ]
    },
    {
        label: '操作',
        width: '200',
        fixed: 'right',
        component: componentOperation
    }
];
