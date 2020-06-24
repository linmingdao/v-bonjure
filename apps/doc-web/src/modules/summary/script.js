import { httpClientForDocument } from '@app/net/httpClient';
import infinityMarkdown from '@app/components/infinity-markdown/index.vue';

export default {
    data() {
        return {
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
            const catalog = await httpClientForDocument.get('/documents/summary/catalog.json');
            this.$set(this, 'data', catalog);
        },
        handleNodeClick({ url }) {
            url && this.$refs['markdownInstance'].fetchAndRenderMarkdown(url);
        }
    },
    components: {
        infinityMarkdown
    }
};
