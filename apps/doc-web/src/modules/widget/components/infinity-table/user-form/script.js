export default {
    data() {
        return {
            // 表单字段
            ruleForm: {
                ...this.initValue
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
            provinceOptions: [
                {
                    value: '上海',
                    label: '上海'
                },
                {
                    value: '福建',
                    label: '福建'
                },
                {
                    value: '江苏',
                    label: '江苏'
                },
                {
                    value: '河南',
                    label: '河南'
                },
                {
                    value: '湖北',
                    label: '湖北'
                },
                {
                    value: '四川',
                    label: '四川'
                }
            ],
            cityOptions: [
                {
                    value: '地区1',
                    label: '地区1'
                },
                {
                    value: '地区2',
                    label: '地区2'
                },
                {
                    value: '地区3',
                    label: '地区3'
                },
                {
                    value: '地区4',
                    label: '地区4'
                },
                {
                    value: '地区5',
                    label: '地区5'
                }
            ]
        };
    },
    props: {
        // 表单的初始化值
        initValue: {
            type: Object,
            default: {
                date: '',
                name: '',
                province: '',
                city: '',
                address: '',
                zip: '',
                state: false
            }
        },
        // 取消按钮的回调函数
        cancel: Function,
        // 确认按钮的回调函数
        confirm: Function
    },
    methods: {
        setFormData(data) {
            this.$set(this, 'ruleForm', data);
        },
        /**
         * 取消新增用户
         */
        handleCancel() {
            // 执行取消的回调函数
            this.cancel && this.cancel();
        },
        /**
         * 重置新增用户的表单
         */
        handleResetForm() {
            this.$refs['userForm'].resetFields();
        },
        /**
         * 确认新增用户
         */
        handleConfirm() {
            this.$refs['userForm'].validate(valid => {
                if (valid) {
                    // 执行确认的回调函数
                    this.confirm && this.confirm(this.ruleForm);
                    this.handleResetForm();
                } else {
                    return false;
                }
            });
        }
    }
};
