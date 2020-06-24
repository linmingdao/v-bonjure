import './style.css';
import userForm from '../../user-form/index.vue';
import template from './template.html';
import infinityPlainDialog from '@vBaseComponent/infinity-plain-dialog/infinity-plain-dialog.vue';

export default {
    template,
    data() {
        return {
            isShowForm: false
        };
    },
    props: ['index', 'row', 'scope', 'context'],
    methods: {
        handleEdit(row) {
            this.isShowForm = true;
            this.$refs.userForm.setFormData({
                ...row
            });
        },
        handleDelete(row, context) {
            context.doDelete(row);
        },
        /**
         * 取消新增用户
         */
        cancel() {
            this.isShowForm = false;
        },
        /**
         * 确认新增用户
         */
        confirm(formData) {
            this.context.doUpdate(formData);
            this.isShowForm = false;
        }
    },
    components: {
        userForm,
        infinityPlainDialog
    }
};
