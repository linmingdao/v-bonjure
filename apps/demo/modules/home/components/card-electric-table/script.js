import columns from './columns/index';
import buildFrom from './form/index';
import tableFilter from './filter/index.vue';
import * as localStorageHelper from '../../../../utils/localStorageHelper';
import electricTable from '@core/components/example/electric-table/index.vue';

export default {
    data() {
        return {
            headers: {
                'token': localStorageHelper.get('token')
            },
            /**
             * CRUD-C操作(新增记录)
             * 
             * 备注: 
             * 新增记录属于创建资源操作，无论是RESTful风格还是传统的请求，都是使用POST请求，
             * 所以taskCreate不需要配置method，目前一定是POST请求
             */
            taskCreate: {
                // 配置新增的后端url
                url: '/user',
                // 配置新增要post的数据，record是新增的记录数据，用户需要自己提供一个data函数将其封装成后端需要的格式
                data: record => {
                    return {
                        userInfo: record
                    };
                },
                // 配置该任务的特殊请求头，会与全局的请求头做合并操作，没有可以不用配置
                headers: {
                    'authority-token': localStorageHelper.get('token')
                },
                // 配置查询参数，这部分数据会以xxx=xxx&sss=sss的形式拼接到url中，没有可以不配置
                queryParams: {}
            },
            /**
             * CRUD-R操作(查询记录)
             * 
             * 备注: 
             * 查询记录属于获取资源操作，无论是RESTful风格还是传统的请求，都是使用GET请求，
             * 所以taskRetrieve不需要配置method，目前一定是GET请求
             */
            taskRetrieve: {
                url: '/users',
                queryParams: {
                    sortName: 'date',
                    sortOrder: 'desc'
                }
            },
            /**
             * CRUD-U操作(更新记录)
             * 
             * 备注: 
             * 更新记录属于更新资源操作，RESTful风格是PATCH，传统的请求是POST请求，
             * 所以taskRetrieve不需要配置method，目前一定是GET请求
             */
            taskUpdate: {
                url: record => `/user/${record.id}`,
                method: 'patch',
                data: record => {
                    return {
                        userInfo: record
                    };
                }
            },
            // CRUD-D操作(删除单条记录)
            taskDelete: {
                url: record => `/user/${record.id}`,
                method: 'delete'
            },
            // CRUD-D操作(批量删除记录)
            taskDeleteInBulk: {
                url: '/users',
                method: 'delete',
                data: records => {
                    return {
                        userIdList: records.map(r => r.id)
                    };
                }
            },
            // 表格列设置
            columns,
            // 设置表格行色号的回调函数
            rowHighlightCallback({ row, rowIndex }) {
                // if (rowIndex === 1) {
                //     return 'warning';
                // } else if (rowIndex === 3) {
                //     return 'success';
                // } else if (rowIndex === 5) {
                //     return 'info';
                // } else if (rowIndex === 7) {
                //     return 'error';
                // } else if (rowIndex === 9) {
                //     return 'primary';
                // }
                return '';
            },
            // 分页配置
            pagination: {
                pageSize: 10,
                pageSizes: [10, 20, 30, 40]
            },
            // 表格的默认排序配置
            sort: {
                prop: 'date',
                order: 'ascending' // 'ascending', 'descending', null
            },
            // 表格是否有选择框
            selection: true,
            // 是否显示行号
            rownum: false
        };
    },
    methods: {
        /**
         * 更新-检索操作的查询参数
         * @param {*} payload 
         */
        retrieveQueryParamsUpdated(payload) {
            this.$set(this.taskRetrieve, 'queryParams', {
                ...this.taskRetrieve.queryParams,
                ...payload
            });
        },
        /**
         * 执行检索表格数据的任务
         */
        doRetrieve() {
            this.$refs.userTable.executeTask('doRetrieve');
        },
        /**
         * 执行批量删除的任务
         */
        doDeleteInBulk() {
            this.$refs.userTable.executeTask('doDeleteInBulk');
        },
        doCreate() {
            const $userTable = this.$refs.userTable;
            this.$refs.userTable.showDialog(buildFrom({
                formData: {},
                confirmTxt: '新增',
                cancelTxt: '取消',
                confirmCallback(formData) {
                    $userTable.executeTask('doCreate', formData);
                },
                cancelCallback(formData) {
                    $userTable.executeTask('hideDialog', formData);
                }
            }), '新增用户');
        },
        doDownload() {
            console.log('doDownload');
        }
    },
    components: {
        'electric-table': electricTable,
        'table-filter': tableFilter
    }
};