import componentDate from './date/index';
import componentAddress from './address/index';
import componentOperation from './operation/index';

export default [
    {
        prop: 'date',
        label: '日期',
        width: 130,
        sortable: true,
        component: componentDate
    },
    {
        prop: 'name',
        label: '姓名',
        width: 120
    },
    {
        prop: 'province',
        label: '省份',
        width: 120
    },
    {
        prop: 'city',
        label: '市区',
        width: 120
    },
    {
        prop: 'address',
        label: '地址',
        component: componentAddress
    },
    {
        label: '状态',
        prop: 'state',
        width: 150,
        formatter(state) {
            return state ? '<span style="color:green;">激活</span>' : '<span style="color:red;">禁用</span>';
        }
    },
    {
        prop: 'zip',
        label: '邮编',
        width: 120
    },
    {
        label: '操作',
        width: '200',
        fixed: 'right',
        component: componentOperation
    }
];
