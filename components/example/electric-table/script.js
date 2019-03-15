import { resolveUrl } from './supports/urlResolver';
import buildHttpClient from './supports/httpClientBuilder';

let httpClient;

export default {
    data() {
        return {
            loading: true,
            tableData: [],
            selectionBuffer: [],
            currentPage: 1,
            total: 0,
            pageSize: 50,
            pageSizes: [50, 100, 150, 200],
            dialogFormVisible: true
        };
    },
    computed: {
        retrieveUrl: function() {
            let taskRetrieve = this.taskRetrieve;
            let queryParams = {
                ...taskRetrieve['queryParams'],
                pageSize: this.pageSize,
                pageNumber: this.currentPage
            };
            return resolveUrl(taskRetrieve.url, queryParams);
        },
        deleteInBulkUrl: function() {
            let taskDeleteInBulk = this.taskDeleteInBulk;
            let queryParams = taskDeleteInBulk['queryParams'];
            return queryParams ? resolveUrl(taskDeleteInBulk.url, queryParams) : taskDeleteInBulk.url;
        }
    },
    mounted() {
        // 组件的初始化
        if (this.pagination && this.pagination.pageSize) {
            this.$set(this, 'pageSize', this.pagination.pageSize);
        }
        if (this.pagination && this.pagination.pageSizes) {
            this.$set(this, 'pageSizes', this.pagination.pageSizes);
        }
        // 初始化httpClient对象
        httpClient = buildHttpClient({
            headers: this.headers,
            context: this
        });
        // 执行一次检索操作以初始化表格首屏数据
        this.doRetrieve();
    },
    props: {
        // 网络请求公共请求头
        headers: Object,
        // CRUD-C操作(新增单条记录)-任务配置信息
        taskCreate: Object,
        // CRUD-R操作(查询)-配置信息
        taskRetrieve: Object,
        // CRUD-U操作(更新记录)-配置信息
        taskUpdate: Object,
        // CRUD-D操作(删除单条记录)-任务配置信息
        taskDelete: Object,
        // CRUD-D操作(批量删除记录)-任务配置信息
        taskDeleteInBulk: Object,
        // 表头的列配置
        columns: Array,
        // 表格的排序字段配置
        sort: Object,
        // 每行前面是否多选的Checkbox
        selection: Boolean,
        // 是否显示行号
        rownum: Boolean,
        // 设置表格每一行背景色的函数
        rowHighlight: Function,
        // 分页配置
        pagination: Object
    },
    methods: {
        /**
         * 对外暴露的接口，用于父组件调用
         * @param {*} taskName 
         * @param {*} payload 
         */
        executeTask(taskName, payload) {
            this[taskName](payload);
        },
        /**
         * 弹窗
         * @param {*} formTemplate 
         * @param {*} title 
         */
        showDialog(formTemplate, title = '\r\n') {
            const h = this.$createElement;
            this.$msgbox({
                title,
                lockScroll: true,
                showConfirmButton: false,
                closeOnClickModal: false,
                message: h(formTemplate)
            });
        },
        /**
         * 隐藏弹窗
         * @param {*} formTemplate 
         * @param {*} title 
         */
        hideDialog() {
            this.$msgbox.close();
        },
        /**
         * CRUD-C操作(新增记录)
         */
        async doCreate(payload) {
            let taskCreate = this.taskCreate;
            let queryParams = taskCreate['queryParams'];
            let url = queryParams ? resolveUrl(taskCreate.url, queryParams) : taskCreate.url;
            const data = taskCreate.data(payload);
            await httpClient.headers({
                ...this.headers,
                ...taskCreate.headers
            }).post(url, data);
            this.hideDialog();
            this.doRetrieve();
        },
        /**
         * CRUD-R操作(检索表格记录)
         */
        async doRetrieve() {
            let taskRetrieve = this.taskRetrieve;
            // 通过url后端检索表格数据
            let response = await httpClient.headers({
                ...this.headers,
                ...taskRetrieve.headers
            }).get(this.retrieveUrl);

            // 解析结果
            if (response.code === 1001) {
                const userList = (response.data && response.data.userList) || [];
                this.$set(this, 'tableData', [...userList]);
                this.$set(this, 'total', response.data.total);
            } else {
                this.$set(this, 'tableData', []);
            }
        },
        /**
         * CRUD-U操作(更新记录)
         */
        async doUpdate(payload) {
            let taskUpdate = this.taskUpdate;
            let queryParams = taskUpdate['queryParams'];
            let url = queryParams ? resolveUrl(taskUpdate.url(payload), queryParams) : taskUpdate.url(payload);
            const data = taskUpdate.data(payload);
            httpClient.headers({
                ...this.headers,
                ...taskUpdate.headers
            }).patch(url, data);
            this.hideDialog();
            this.doRetrieve();
        },
        /**
         * CRUD-D操作(删除单条记录)
         */
        async doDelete(payload) {
            this.$confirm('确认要删除该记录么？', '提示', {
                type: 'warning',
                closeOnClickModal: false,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                distinguishCancelAndClose: true
            }).then(async() => {
                let taskDelete = this.taskDelete;
                let queryParams = taskDelete['queryParams'];
                let url = queryParams ? resolveUrl(taskDelete.url(payload), queryParams) : taskDelete.url(payload);
                await httpClient.headers({
                    ...this.headers,
                    ...taskDelete.headers
                }).delete(url);
                this.doRetrieve();
                this.$message({
                    type: 'info',
                    message: '删除成功'
                });
            }).catch(action => {});
        },
        /**
         * CRUD-D操作(批量删除记录)
         */
        async doDeleteInBulk() {
            if (this.selectionBuffer.length) {
                this.$confirm('确认要删除已勾选的记录么？', '提示', {
                    type: 'warning',
                    closeOnClickModal: false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    distinguishCancelAndClose: true
                }).then(async() => {
                    let taskDeleteInBulk = this.taskDeleteInBulk;
                    const url = this.deleteInBulkUrl;
                    const data = taskDeleteInBulk.data(this.selectionBuffer);
                    await httpClient.headers({
                        ...this.headers,
                        ...taskDeleteInBulk.headers
                    }).delete(url, data);
                    this.doRetrieve();
                    this.$message({
                        type: 'info',
                        message: '删除成功'
                    });
                }).catch(action => {});
            } else {
                this.$message({
                    type: 'info',
                    message: '请先勾选要删除的记录'
                });
            }
        },
        /**
         * 检测用户选择了表格的某一行以缓存选中的数据行
         * @param {*} selection 
         */
        selectionChange(selection) {
            this.selectionBuffer = selection;
        },
        /**
         * 处理用户设置的表格每行的色值样式
         */
        tableRowHighlightClassName() {
            return typeof this.rowHighlight === 'function' ? this.rowHighlight(arguments[0]) : '';
        },
        /**
         * 处理行号的显示
         * @param {*} index 
         */
        tableRowIndex(index) {
            return index + 1;
        },
        /**
         * 处理分页组件每页显示的数量改变
         * @param {*} val 
         */
        handleSizeChange(val) {
            this.$set(this, 'pageSize', val);
            this.doRetrieve();
        },
        /**
         * 处理分页组件当前页码改变
         * @param {*} val 
         */
        handleCurrentChange(val) {
            this.$set(this, 'currentPage', val);
            this.doRetrieve();
        }
    }
};