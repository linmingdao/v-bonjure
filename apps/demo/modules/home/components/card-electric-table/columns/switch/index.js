import './style.css';
import template from './template.html';

export default {
    template,
    props: ['index', 'row', 'tableData'],
    methods: {
        handleSwitchChange(index, row, tableData) {
            console.log('handleSwitchChange这是组件的选项对象');
        }
    }
};