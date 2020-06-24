const httpClient = window.$Http.getClient().disableLoading();

export default {
    data() {
        return {
            // 搜索区域的条件字段
            filterParams: {
                username: '',
                province: ''
            },
            options: [
                {
                    value: '',
                    label: '请选择'
                },
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
            // 表格列设置
            columns: [
                {
                    prop: 'date',
                    label: '日期',
                    width: 130,
                    sortable: true
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
                    label: '地址'
                },
                {
                    label: '状态',
                    prop: 'state',
                    width: 150,
                    formatter(state) {
                        return state
                            ? '<span style="color:green;">激活</span>'
                            : '<span style="color:red;">禁用</span>';
                    }
                },
                {
                    prop: 'zip',
                    label: '邮编',
                    width: 120
                }
            ],
            // 表单数据 ——> 注意：名字一定得是ruleForm
            ruleForm: {
                date: '',
                name: '',
                province: '',
                city: '',
                address: '',
                zip: '',
                state: false
            },
            // 配置表单的校验规则
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
    provide() {
        return {
            ruleForm: this.ruleForm
        };
    },
    methods: {
        /**
         * 新增用户信息
         * @param {*} data
         */
        async methodCreate(data) {
            const name = data['name'];
            await httpClient.post('/user', { userInfo: data });
            window.$notificator.messageSuccess(`成功新增了用户：${name}`);
        },
        /**
         * 删除用户信息
         * @param {*} param0
         */
        async methodDelete({ id, name }) {
            await httpClient.delete(`/user/${id}`);
            window.$notificator.messageSuccess(`成功删除了用户：${name}`);
        },
        /**
         * 批量删除用户
         * @param {*} userList
         */
        async methodDeleteBulk(userList) {
            await httpClient.delete('users', { userIdList: userList.map(user => user['id']) });
            window.$notificator.messageSuccess('用户删除成功');
        },
        /**
         * 更新用户信息
         * @param {*} userInfo
         */
        async methodUpdate(userInfo) {
            await httpClient.patch(`user/${userInfo['id']}`, { userInfo });
            window.$notificator.messageSuccess('成功更新了用户信息');
        },
        /**
         * 提供给表格组件的数据获取接口
         * @param {*} param0
         */
        async methodRetrieve({ pageSize, page }) {
            const response = await httpClient.queryParams({ page, pageSize, ...this.filterParams }).get('/users');
            const { total, userList } = response['data'];
            // 返回表格可识别的数据结构
            return { total, tableData: userList };
        }
    }
};
