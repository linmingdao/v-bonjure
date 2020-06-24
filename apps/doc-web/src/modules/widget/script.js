import { httpClientForDocument } from '@app/net/httpClient';
import widgetDoc from '@app/components/widget-doc/index.vue';
import infinityMarkdown from '@app/components/infinity-markdown/index.vue';

// infinity组件库
import eleUi from './components/ele-ui/index.vue';
import themeGreen from './components/theme-green/index.vue';
import formGroup from './components/form-group/index.vue';
import infinityTable from './components/infinity-table/index.vue';
import infinitySelect from './components/infinity-select/index.vue';
import infinityAdaptiveInput from './components/infinity-adaptive-input/index.vue';
import infinityDialog from './components/infinity-dialog/index.vue';
import infinityPlainDialog from './components/infinity-plain-dialog/index.vue';
import infinityNotification from './components/infinity-notification/index.vue';
import fortawesome from './components/fortawesome/index.vue';
// simply组件库
import simplyTable from './components/simply-table/index.vue';

export default {
    data() {
        return {
            currentComponent: '',
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            data: []
        };
    },
    mounted() {
        this.fetchCatalog();
    },
    methods: {
        async fetchCatalog() {
            const catalog = await httpClientForDocument.get('/documents/widget/catalog.json');
            this.$set(this, 'data', catalog);
        },
        handleNodeClick({ url, component }) {
            if (component) {
                this.$set(this, 'currentComponent', component);
                component !== 'ele-ui' && url && this.$refs['markdownInstance'].fetchAndRenderMarkdown(url);
            }
        }
    },
    components: {
        widgetDoc,
        infinityMarkdown,
        // infinity组件库
        eleUi,
        themeGreen,
        formGroup,
        infinityTable,
        infinitySelect,
        infinityAdaptiveInput,
        infinityDialog,
        infinityPlainDialog,
        infinityNotification,
        fortawesome,
        // simply组件库
        simplyTable
    }
};
