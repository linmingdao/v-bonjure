### 表格组件-重构版

该表格组件是在《表格组件-旧版本》的基础上的重构版本，重构原因说明如下：

<font color=red>《表格组件-旧版本》的设计中内嵌了负责请求的Http客户端对象，这就导致了组件内部需要大量地考虑请求的各种复杂情景，比如：请求头信息的设置、查询参数的设置、Token失效的处理、其他请求异常的处理等等，但是这些复杂网络请求问题的处理不应该转移给表格组件</font>

为此，有必要对该组件进行重构，该组件重构后最大的变化是：表格组件内部不再负责表格数据的网络请求，提供了如下五个属性，分别配置表格的增、删、改、查操作
* remote-retrieve
* remote-delete
* remote-create
* remote-update
* remote-delete-in-bulk

用户需要自己提供负责网络请求的方法传入到相应配置以完成表格的某种操作，详细用法请阅读下面具体配置信息。

#### 一、导入并注册该组件

tableFilter是表格顶部的搜索区域组件，由于不同表格的搜索区域各不相同，所以搜索区域组件是业务开发自己设计提供的

```js
import Http from '@core/http';
import columns from './columns/index';
import tableFilter from './filter/index.vue';
import infinityTable from '@vBaseComponent/infinity-table/index.vue';

const httpClient = Http.getClient().disableLoading();

export default {
    data() {
        return {
            // 表格列设置
            columns
        };
    },
    methods: {
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
        }
    },
    components: {
        tableFilter,
        infinityTable
    }
};
```

#### 二、使用该组件

```html
    <!-- 表格组件，主要是配置表格的CRUD操作 -->
      <infinity-table
        ref="userTable"
        :remote-retrieve="remoteRetrieve"
        :remote-delete="remoteDelete"
        :remote-create="remoteCreate"
        :remote-update="remoteUpdate"
        :remote-delete-in-bulk="remoteDeleteInBulk"
        :columns="columns"
      >
        <!-- 用户自定义的表格条件设置区域 -->
        <table-filter
          v-model="queryParams"
          @showFormDialog="showFormDialog"
          @search="search"
          @download="download"
          @batchRemove="batchRemove"
        ></table-filter>
      </infinity-table>
```

#### 三、配置说明

##### 1、remote-retrieve：CRUD-R操作(查询记录)，查询记录属于获取资源操作

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
    [{
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
    }, {
        prop: 'name',
        label: '姓名',
        width: 120
    }, {
        prop: 'province',
        label: '省份',
        width: 120
    }, {
        prop: 'city',
        label: '市区',
        width: 120
    }, {
        prop: 'address',
        label: '地址',
        component: componentAddress
    }, {
        label: '开关',
        width: 150,
        component: componentSwitch
    }, {
        prop: 'zip',
        label: '邮编',
        width: 120
    }, {
        label: '操作',
        width: '200',
        // 指定 '操作' 这一列会被固定在右边，及时出现左右滚动条
        fixed: 'right',
        component: componentOperation
    }]
```

##### 3、pagination：分页配置，会根据 total信息自动计算分页数量，默认值为：

```js
    {
        // 每一页显示多少条数据
        pageSize: 10,
        // 设置每一页显示多少条数据的下拉列表
        pageSizes: [10, 20, 30, 40]
    }
```

##### 4、remote-create：CRUD-C操作(新增记录)，新增记录属于创建资源操作
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

##### 5、remote-delete：CRUD-D操作(删除单条记录)
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

##### 6、remote-delete-in-bulk：CRUD-D操作(批量删除记录)
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

##### 7、remote-update：CRUD-U操作(更新记录)，更新记录属于更新资源操作

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

##### 8、selection：表格是否有选择框，为Boolean，true：有选择框，false：无选择框

##### 9、rownum：是否显示行号，为Boolean，true：显示行号，false：不显示行号

##### 10、rowHighlightCallback：设置表格行色号的回调函数

例如：
```js
function({ row, rowIndex }) {
    if (rowIndex === 1) {
        return 'warning';
    } else if (rowIndex === 3) {
        return 'success';
    } else if (rowIndex === 5) {
        return 'info';
    } else if (rowIndex === 7) {
        return 'error';
    } else if (rowIndex === 9) {
        return 'primary';
    }
    return '';
}
```

### 四、表格搜索区域组件的开发

该部分文档待补充