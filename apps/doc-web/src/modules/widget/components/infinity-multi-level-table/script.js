import formatter from './formatter.js';
import { tableData, expandTableData } from './mock.js';

export default {
    data() {
        return {
            formatter,
            tableData,
            expandTableData
        };
    },
    methods: {
        handleEdit(index, data) {
            console.log(index);
        },
        handleStop(index, data) {
            console.log(index);
        },
        handleRecord(index, data) {
            console.log(index);
        }
    }
};
