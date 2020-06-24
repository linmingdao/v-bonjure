import Http from '@core/http';
import notificator from '@core/notificator';
import columns from './columns/index';
import tableFilter from './filter/index.vue';
import userForm from './user-form/index.vue';
import infinityTable from '@vBaseComponent/infinity-table/infinity-table.vue';
import infinityPlainDialog from '@vBaseComponent/infinity-plain-dialog/infinity-plain-dialog.vue';

const httpClient = Http.getClient().disableLoading();

export default {
    data() {
        return {
            isShowForm: false,
            // 搜索区域的条件字段
            queryParams: {
                username: '',
                province: ''
            },
            // 表格列设置
            columns,
            // 表格的默认排序配置：'ascending', 'descending', null
            // sort: { prop: 'date', order: 'null' },
            // 表格是否有选择框
            selection: true,
            // 是否显示行号
            rownum: false
        };
    },
    methods: {
        /**
         * 显示添加用户的表单弹窗
         */
        showFormDialog() {
            this.isShowForm = true;
        },
        /**
         * 执行检索表格数据的任务
         */
        search() {
            this.$refs.userTable.doRetrieve();
        },
        /**
         * 批量删除用户
         */
        batchRemove() {
            this.$refs.userTable.doDeleteInBulk();
        },
        /**
         * 下载用户列表
         */
        download() {
            notificator.confirm('皮一下，并没有用户列表文件提供下载哟!');
        },
        /**
         * 设置表格行色号的回调函数
         * @param {*} param0
         */
        rowHighlightCallback({ row }) {
            return row['state'] ? '' : 'error';
        },
        /**
         * 新增用户信息
         * @param {*} data
         */
        async remoteCreate(data) {
            const name = data['userInfo']['name'];
            await httpClient.post('/user', data);
            notificator.messageSuccess(`成功新增了用户：${name}`);
        },
        /**
         * 删除用户信息
         * @param {*} param0
         */
        async remoteDelete({ id, name }) {
            await httpClient.delete(`/user/${id}`);
            notificator.messageSuccess(`成功删除了用户：${name}`);
        },
        /**
         * 批量删除用户
         * @param {*} userList
         */
        async remoteDeleteInBulk(userList) {
            await httpClient.delete('users', { userIdList: userList.map(user => user['id']) });
            notificator.messageSuccess('用户删除成功');
        },
        /**
         * 更新用户信息
         * @param {*} userInfo
         */
        async remoteUpdate(userInfo) {
            await httpClient.patch(`user/${userInfo['id']}`, { userInfo });
            notificator.messageSuccess('成功更新了用户信息');
        },
        /**
         * 提供给表格组件的数据获取接口
         * @param {*} param0
         */
        async remoteRetrieve({ pageSize, page }) {
            const response = await httpClient.queryParams({ page, pageSize, ...this.queryParams }).get('/users');
            const { total, userList } = response['data'];
            // 返回表格可识别的数据结构
            return { total, tableData: userList };
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
        confirm(fromData) {
            this.$refs.userTable.doCreate({ userInfo: fromData });
            this.isShowForm = false;
        }
    },
    components: {
        userForm,
        tableFilter,
        infinityTable,
        infinityPlainDialog
    }
};
