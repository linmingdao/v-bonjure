### 支持后端搜索的下拉框组件

#### <font color=blue size=4>一、导入并注册该组件</font>

```js
import Http from '@core/http';
import formGroup from '@vBaseComponent/form-group/index.vue';
import infinitySelect from '@vBaseComponent/infinity-select/index.vue';

const httpClient = Http.getClient().disableLoading();

export default {
    data() {
        return {
            value1: '王小虎_1',
            value2: ['王小虎_3', '王小虎_5']
        };
    },
    methods: {
        async remoteMethod({ fuzzyValue }) {
            const response = await httpClient
                .queryParams({ username: fuzzyValue, pageSize: 20, page: 1 })
                .get('/users');
            return response.data.userList.filter(item => item.name.includes(fuzzyValue));
        },
        handleChange({ value, options }) {
            console.log(value, options);
        },
        filterMethod({ options, filterParams }) {
            const { fuzzyValue } = filterParams;
            return options.filter(item => item.name.includes(fuzzyValue));
        }
    },
    components: { formGroup, infinitySelect }
};
```

#### <font color=blue size=4>二、使用该组件</font>

```html
<form-group desc="基础下拉框_单选" :width="250" style="margin-bottom: 5px;">
    <infinity-select
        v-model="value1"
        valueKey="name"
        labelKey="name"
        value-format="string"
        :remote-method="remoteMethod"
    />
</form-group>

<form-group desc="基础下拉框_多选" :width="250" style="margin-bottom: 5px;">
    <infinity-select
        v-model="value2"
        valueKey="name"
        labelKey="name"
        value-format="Array"
        :multiple="true"
        :remote-method="remoteMethod"
        @change="handleChange"
    />
</form-group>
```

#### <font color=blue size=4>三、Select Events</font>

##### 1、change

#### <font color=blue size=4>四、Select Methods</font>

##### 1、clearValues，清空值

##### 2、reFetchRemoteOptions，重新请求远程的下拉选项列表

#### <font color=blue size=4>五、Select Attributes</font>

##### 1、name：指定表单控件的名字

##### 2、value/v-model 绑定值，类型为：String/Array

##### 3、value-separator，值的分隔符，默认值为：','

##### 4、value-format，输出的值的格式，默认值为：'Array'，可选值为：'String'、'Array'

##### 5、remote，过滤的时候为远程过滤还是本地数据过滤，默认值是：false

##### 6、remote-method，远程搜索方法

##### 7、filter-method，本地搜索方法

##### 8、label-key，从返回的下拉列表中提取文本

##### 9、value-key，从返回的下拉列表中提取值

##### 10、multiple，是否是多选，为 Boolean，true：多选，false：单选，默认是：false

##### 11、multiple-limit：多选时用户最多可以选择的项目数，为 0 则不限制(文字超出会以...的形式显示))，超过会显示成 "3 selected"

##### 12、multiple-limit-suffix，达到多选项目上限的时候，显示在数字后的文字信息，默认是：'selected'

##### 13、enable-check-all，是否自带全选选项

##### 14、width，指定 previewBar 的宽度

##### 15、height，指定 previewBar 的高度

##### 16、border-color，指定 previewBar 的边框颜色

##### 17、border-radius，指定 previewBar 的边框弧度

##### 18、placeholder，指定 previewBar 的 placeholder

##### 19、options-panel-width，指定 optionsPanel 的宽度(不指定默认是与值的预览 bar 同宽)

##### 20、options-list-max-height，指定 optionsPanel 的选项列表最大高度(默认 300px)

##### 21、empty-option-text，指定 optionsPanel 没有选项列表时候的提示文本

##### 22、check-all-text，指定 optionsPanel 全选选项的文本

##### 23、reserve-values，可搜索的情况是每次搜索否保留上一次的选中结果（会自动去重）

##### 24、fuzzy-filter，指定 optionsPanel 是否启用模糊匹配的文本过滤器

##### 25、fuzzy-placeholder，指定 optionsPanel 模糊匹配的文本过滤器提示文本

##### 26、precise-filter，指定 optionsPanel 是否启用精确匹配的文本过滤器

##### 27、precise-placeholder，指定 optionsPanel 精确匹配的文本过滤器提示文本

##### 28、interval-filter，指定 optionsPanel 是否启用区间过滤器

##### 29、min-placeholder，指定 optionsPanel 区间过滤器最小值提示文本

##### 30、max-placeholder，指定 optionsPanel 区间过滤器最大值提示文本

##### 31、fetch-options-immediately，指定 下拉框组件渲染的时候 是否立即拉取选项信息

##### 32、re-fetch-before-show-options，指定 下拉框组件 在显示下拉选项之前是否每次重新拉取最新的数据

##### 33、enable-please-select，是否启用 下拉框组件 的 “请选择” 选项
