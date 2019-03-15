import './style.css';
import template from './template.html';
import buildFrom from '../../form/index';

export default {
    template,
    props: ['index', 'row', 'scope', 'context'],
    methods: {
        handleEdit(row, context) {
            context.showDialog(buildFrom({
                formData: row,
                confirmTxt: '保存',
                cancelTxt: '取消',
                confirmCallback(formData) {
                    context.executeTask('doUpdate', formData);
                },
                cancelCallback(formData) {
                    context.executeTask('hideDialog', formData);
                }
            }), '编辑用户');
        },
        handleDelete(row, context) {
            context.executeTask('doDelete', row);
        }
    }
};