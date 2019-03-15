import './style.css';
import template from './template.html';

export default function({
    formData = {},
    confirmTxt = '提交',
    cancelTxt = '取消',
    confirmCallback,
    cancelCallback
}) {
    return {
        template,
        data() {
            return {
                // 表单字段
                ruleForm: {
                    ...formData
                },
                // 表单的校验规则
                rules: {
                    date: [{ required: true, message: '请选择日期', trigger: 'change' }],
                    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                    province: [{ required: true, message: '请选择省份', trigger: 'change' }],
                    city: [{ required: true, message: '请选择市区', trigger: 'change' }],
                    address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
                    zip: [{ required: true, message: '请输入邮编', trigger: 'blur' }]
                },
                confirmTxt,
                cancelTxt,
                provinceOptions: [{
                    value: '上海',
                    label: '上海'
                }, {
                    value: '福建',
                    label: '福建'
                }, {
                    value: '江苏',
                    label: '江苏'
                }, {
                    value: '河南',
                    label: '河南'
                }, {
                    value: '湖北',
                    label: '湖北'
                }, {
                    value: '四川',
                    label: '四川'
                }],
                cityOptions: [{
                    value: '普陀区',
                    label: '普陀区'
                }, {
                    value: '普陀区2',
                    label: '普陀区2'
                }, {
                    value: '普陀区3',
                    label: '普陀区3'
                }, {
                    value: '普陀区4',
                    label: '普陀区4'
                }, {
                    value: '普陀区5',
                    label: '普陀区5'
                }]
            };
        },
        methods: {
            confirm: function(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        typeof confirmCallback === 'function' && confirmCallback(this.ruleForm);
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            cancel: function() {
                typeof cancelCallback === 'function' && cancelCallback(this.ruleForm);
            }
        }
    };
};