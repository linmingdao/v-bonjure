import formGroup from '@core/components/example/form-group/index.vue';

export default {
    data() {
        return {
            privateQueryParams: {
                username: this.queryParams.username || '',
                province: this.queryParams.province || ''
            },
            options: [{
                value: '',
                label: '请选择'
            }, {
                value: '上海',
                label: '上海'
            }, {
                value: '福建',
                label: '福建'
            }, {
                value: '江苏',
                label: '江苏'
            }, {
                value: '河南',
                label: '河南'
            }, {
                value: '湖北',
                label: '湖北'
            }, {
                value: '四川',
                label: '四川'
            }]
        };
    },
    watch: {
        privateQueryParams: {
            handler(val) {
                this.$emit('queryParamsUpdated', val);
            },
            deep: true
        }
    },
    methods: {
        emitEvent: function(eventName) {
            this.$emit(eventName);
        }
    },
    props: ['queryParams'],
    components: {
        'form-group': formGroup
    }
};