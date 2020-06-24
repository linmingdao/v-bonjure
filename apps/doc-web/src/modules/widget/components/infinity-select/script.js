import Http from '@core/http';
import formGroup from '@vBaseComponent/form-group/form-group.vue';
import infinitySelect from '@vBaseComponent/infinity-select/infinity-select.vue';

const httpClient = Http.getClient().disableLoading();

export default {
    data() {
        return {
            value1: '',
            value2: '王小虎_3,王小虎_5',
            value3: ['王小虎_5', '王小虎_7'],
            value4: ['王小虎_2', '王小虎_1'],
            value5: '王小虎_3,王小虎_5',
            value6: [],
            value7: [],
            value8: [],
            value9: []
        };
    },
    methods: {
        async remoteMethod({ fuzzyValue }) {
            console.log('exec 【remote】 method');
            const response = await httpClient
                .queryParams({ username: fuzzyValue, pageSize: 20, page: 1 })
                .get('/users');
            return response.data.userList.filter(item => item.name.includes(fuzzyValue));
        },
        handleChange({ value, options }) {
            console.log('handleChange');
            console.log(value, options);
        },
        filterMethod({ options, filterParams }) {
            console.log('exec 【filter】 method，过滤条件对象内容：', JSON.stringify(filterParams));
            const { fuzzyValue } = filterParams;
            return options.filter(item => item.name.includes(fuzzyValue));
        }
    },
    components: { formGroup, infinitySelect }
};
