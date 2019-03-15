// 引入最外层的组件的主题样式
import '@core/components/example/theme-green/index.css';
import draggable from 'vuedraggable';

const UNIVERSE_GROUP = `group_${Date.now()}`;

export default {
    name: 'DndList',
    components: { draggable },
    watch: {},
    data() {
        return {
            groupFalgs: UNIVERSE_GROUP,
            UNIVERSE_GROUP,
            list1: [],
            list2: [{
                'name': 'John',
                'id': 1
            }, {
                'name': 'Joao',
                'id': 2
            }, {
                'name': 'Jean',
                'id': 3
            }, {
                'name': 'Gerard',
                'id': 4
            }, {
                'name': 'Juan',
                'id': 5
            }, {
                'name': 'John',
                'id': 6
            }, {
                'name': 'John',
                'id': 7
            }, {
                'name': 'Jean',
                'id': 8
            }, {
                'name': 'Joao',
                'id': 9
            }, {
                'name': 'Edgard',
                'id': 10
            }, {
                'name': 'Johnson',
                'id': 11
            }]
        };
    },
    computed: {},
    methods: {
        list1Start(event) {
            this.groupFalgs = `group_${Date.now()}`;
            // console.log('list1Start');
            // console.log(event);
        },
        list1End(event) {
            this.groupFalgs = UNIVERSE_GROUP;
            // console.log('list1End');
            // console.log(event);
        },
        list2End(event) {
            if (event.to.className === 'dragAreaList1') {
                this.$set(this.list2[event.oldIndex], 'flag', true);
            }
            // console.log('list2End');
            // console.log(event);
        },
        handleDel(index, id) {
            this.list1.splice(index, 1);
            this.$set(this.list2.find((value, index, arr) => {
                return value.id === id;
            }), 'flag', false);
        }
    }
};