import componentDate from './date/index';
import componentAddress from './address/index';
import componentSwitch from './switch/index';
import componentOperation from './operation/index';

export default [{
    prop: 'date',
    label: '日期',
    width: 130,
    sortable: true,
    component: componentDate
}, {
    prop: 'name',
    label: '姓名',
    width: 120
}, {
    prop: 'province',
    label: '省份',
    width: 120
}, {
    prop: 'city',
    label: '市区',
    width: 120
}, {
    prop: 'address',
    label: '地址',
    component: componentAddress
}, {
    label: '开关',
    width: 150,
    component: componentSwitch
}, {
    prop: 'zip',
    label: '邮编',
    width: 120
}, {
    label: '操作',
    width: '200',
    fixed: 'right',
    component: componentOperation
}];