import { createNamespacedHelpers } from 'vuex';
import { MODULES, MUTATIONS } from '../../../../constants/storeTypes.js';

// 划分到更细的模块(注意：每个模块都是namespaced)
const counterMap = createNamespacedHelpers(`${MODULES.HOME}/${MODULES.COUNTER}`);

export default {
    data() {
        return {}
    },
    computed: {
        ...counterMap.mapState(['count']),
        ...counterMap.mapGetters(['countWithRmbPrefix'])
    },
    methods: {
        ...counterMap.mapMutations([
            MUTATIONS.INCREMENT,
            MUTATIONS.DECREMENT
        ])
    }
};