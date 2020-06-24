import infinitySelect from '@vBaseComponent/infinity-select/infinity-select.vue';
import formGroup from '@vBaseComponent/form-group/form-group.vue';

export default {
    data() {
        return {
            selectValue1: '',
            remote: {
                url() {
                    return '/users';
                },
                headers() {
                    return {
                        token: 'ssssssss'
                    };
                },
                queryParams() {
                    return {
                        pageSize: 10,
                        pageNumber: 1
                    };
                }
            },
            filterParams({ filterText }) {
                return {
                    username: filterText
                };
            },
            dataSourceFormatter(response) {
                return response.data.userList;
            },
            textExtractor(data) {
                return data['name'];
            },
            valueExtractor(data) {
                return data['name'];
            }
        };
    },
    components: {
        formGroup,
        infinitySelect
    }
};
