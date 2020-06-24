import formGroup from '@vBaseComponent/form-group/form-group.vue';

export default {
    data() {
        return {
            privateQueryParams: {
                username: this.value.username || '',
                province: this.value.province || ''
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
            ]
        };
    },
    watch: {
        privateQueryParams: {
            handler(val) {
                this.$emit('input', val);
            },
            deep: true
        }
    },
    props: ['value'],
    components: {
        formGroup
    }
};
