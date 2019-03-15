// 引入最外层的组件的主题样式
import '@core/components/example/theme-green/index.css';

export default {
    data() {
        return {
            input: '',
            textarea: '',
            num: 1,
            radio: '1',
            checkList: ['选中且禁用', '复选框 A'],
            timeValue1: '',
            timeValue2: new Date(2016, 9, 10, 18, 40),
            timeValue3: new Date(2016, 9, 10, 18, 40),
            timeValue4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
            timeValue5: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶',
                disabled: true
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: ''
        };
    },
    methods: {
        handleChange(value) {
            console.log(value);
        }
    }
};