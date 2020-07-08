### 表格组件-简单版

该表格组件是在《表格组件-重构版》的基础上的简单版本，使用方便，代码简单。提供了如下五个属性，分别配置表格的增、删、改、查、批量删除操作

-   `method-retrieve`
-   `method-delete`
-   `method-create`
-   `method-update`
-   `method-delete-bulk`

增、删、改、查之前需要做的操作，该方法返回 `Boolean` 值，返回 `true` 继续执行后续操作，返回 `false`不再往下执行

-   `method-before-delete`
-   `method-before-create`
-   `method-before-update`
-   `method-before-retrieve`
-   `method-before-delete-bulk`
-   `method-before-show-edit-dialog`
-   `method-before-show-create-dialog`

用户需要自己提供负责网络请求的方法传入到相应配置以完成表格的某种操作，详细用法请阅读下面具体配置信息。

#### 一、导入并注册该组件

```js
import Http from '@core/http';
import notificator from '@core/notificator';
import simplyTable from '@vBaseComponent/simply-table';
import formGroup from '@vBaseComponent/form-group';

const httpClient = Http.getClient().disableLoading();

export default {
    data() {
        return {
            // 搜索区域的条件字段
            filterParams: {
                username: '',
                province: ''
            },
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
            }
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
            notificator.messageSuccess(`成功新增了用户：${name}`);
        },
        /**
         * 删除用户信息
         * @param {*} param0
         */
        async methodDelete({ id, name }) {
            await httpClient.delete(`/user/${id}`);
            notificator.messageSuccess(`成功删除了用户：${name}`);
        },
        /**
         * 批量删除用户
         * @param {*} userList
         */
        async methodDeleteBulk(userList) {
            await httpClient.delete('users', { userIdList: userList.map(user => user['id']) });
            notificator.messageSuccess('用户删除成功');
        },
        /**
         * 更新用户信息
         * @param {*} userInfo
         */
        async methodUpdate(userInfo) {
            await httpClient.patch(`user/${userInfo['id']}`, { userInfo });
            notificator.messageSuccess('成功更新了用户信息');
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
    },
    components: {
        simplyTable,
        formGroup
    }
};
```

#### 二、使用该组件

**slot="filter"** 是表格顶部的搜索区域插槽，由于不同表格的搜索区域各不相同，所以搜索区域组件是业务开发自己设计提供的

**slot="form"** 是“新增”和“编辑”时自定义的表单区域插槽，由于不同表格需要编辑的表单项不同，所以表单区域内的表单项是业务开发自己设计提供的

**slot="customBtn"** 表单自定义的按钮区域插槽，表单默认有“取消”、“重置”、“提交”，还需要其他按钮可以在此处添加

```html
<!-- 表格组件，主要是配置表格的CRUD操作 -->
<simply-table
    form-title="编辑-设备id"
    :columns="columns"
    :method-create="methodCreate"
    :method-update="methodUpdate"
    :method-retrieve="methodRetrieve"
    :method-delete-bulk="methodDeleteBulk"
>
    <!-- 用户自定义的表格条件设置区域 -->
    <form-group slot="filter" desc="项目" :formWidth="150">
        <el-select v-model="filterParams.project" placeholder="请选择">
            <el-option v-for="item in projects" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </form-group>
    <form-group desc="数据源" :formWidth="150">
        <el-select v-model="filterParams.source" placeholder="请选择">
            <el-option v-for="item in sources" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </form-group>
    <form-group desc="数据表" :formWidth="150">
        <el-select v-model="filterParams.table" placeholder="请选择">
            <el-option v-for="item in tables" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </form-group>

    <!-- 用户自定义的表单区域 -->

    <el-form slot="form" label-position="left" label-width="80px" ref="formData" :model="ruleForm" :rules="rules">
        <el-form-item label="字段名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入字段名"></el-input>
        </el-form-item>
        <el-form-item label="是否展示" prop="type">
            <el-switch
                v-model="ruleForm.type"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-valuet="Y"
                inactive-value="N"
            ></el-switch>
        </el-form-item>
        <el-form-item label="组件类型" prop="widgetype">
            <el-select v-model="ruleForm.widgetype" placeholder="请选择组件类型" style="width: 100%;">
                <el-option
                    v-for="item in widgeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
        </el-form-item>
    </el-form>

    <!-- 用户自定义表单底部按钮 -->
    <template slot="customBtn">
        <el-button type="warning" @click="handleTestConnect">连接测试</el-button>
    </template>
</simply-table>
```

#### 三、配置说明

##### 1、method-retrieve：CRUD-R 操作(查询记录)，查询记录属于获取资源操作

```js
/**
 * 提供给表格组件的数据获取接口
 * @param {*} param0
 */
async remoteRetrieve({ pageSize, page }) {
    const response = await httpClient.queryParams({ page, pageSize, ...this.queryParams }).get('/users');
    const { total, userList } = response['data'];
    // 返回表格可识别的数据结构
    return { total, tableData: userList };
}
```

##### 2、与 remote-retrieve 配套使用的一个配置是 columns（将后端数据映射成表格的每一行）

```js
[
    {
        // 将rows中每一项中的那个属性映射成 '日期列'
        prop: 'date',
        // 指定 'date' 字段在表格表头中显示的名称信息
        label: '日期',
        // 指定该 '日期列' 显示的宽度
        width: 130,
        // 指定 '日期列' 是否是排序字段
        sortable: true,
        // 你可以指定一个控件用于显示 '日期列' 的值，而非只是简单地 字符串形式
        component: componentDate
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
            return state ? '<span style="color:green;">激活</span>' : '<span style="color:red;">禁用</span>';
        }
    },
    {
        // 最后一列不需要设置宽度
        prop: 'zip',
        label: '邮编'
    }
];
```

##### 3、pagination：分页配置，会根据 total 信息自动计算分页数量，默认值为：

```js
    {
        // 每一页显示多少条数据
        pageSize: 10,
        // 设置每一页显示多少条数据的下拉列表
        pageSizes: [10, 20, 30, 40]
    }
```

##### 4、method-create：CRUD-C 操作(新增记录)，新增记录属于创建资源操作

```js
/**
 * 新增用户信息
 * @param {*} data
 */
async remoteCreate(data) {
    const name = data['userInfo']['name'];
    await httpClient.post('/user', data);
    notificator.messageSuccess(`成功新增了用户：${name}`);
}
```

##### 5、method-delete：CRUD-D 操作(删除单条记录)

```js
/**
 * 删除用户信息
 * @param {*} param0
 */
async remoteDelete({ id, name }) {
    await httpClient.delete(`/user/${id}`);
    notificator.messageSuccess(`成功删除了用户：${name}`);
}
```

##### 6、method-delete-bulk：CRUD-D 操作(批量删除记录)

```js
/**
 * 批量删除用户
 * @param {*} userList
 */
async remoteDeleteInBulk(userList) {
    await httpClient.delete('users', { userIdList: userList.map(user => user['id']) });
    notificator.messageSuccess('用户删除成功');
}
```

##### 7、remote-update：CRUD-U 操作(更新记录)，更新记录属于更新资源操作

```js
/**
 * 更新用户信息
 * @param {*} userInfo
 */
async remoteUpdate(userInfo) {
    await httpClient.patch(`user/${userInfo['id']}`, { userInfo });
    notificator.messageSuccess('成功更新了用户信息');
}
```

##### 8、methodSortChange：远程排序方法

接收三个参数: column(列信息)、 prop（排序字段）、 order（排序方式：ascending/descending/null）

```js
handleSortChange({ colum, prop, order }) {
    this.orderKey = prop;
    if (order === 'ascending') {
        this.orderType = 0;
    } else if (order === 'descending') {
        this.orderType = 1;
    } else {
        this.orderType = -1;
        this.orderKey = '';
    }
    if (this.$refs['tpl-table']) {
        this.$refs['tpl-table'].executeMethodRetrieve();
    }
}
```

##### 9、表单数据名字一定得是 ruleForm,并且使用 provide 注入数据

注意：此处要使用箭头函数

```js
provide() {
        return {
            ruleForm:() => this.ruleForm
        };
    },
```

##### 10、form-title：总一定表单标题，默认为“表单信息”

##### 11、cell-style：表格单元格样式，Function({row, column, rowIndex, columnIndex})/Object
