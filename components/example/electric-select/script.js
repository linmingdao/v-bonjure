import ComboBox from './combo-box';
import PreviewPanel from './preview-panel';

export default {
    data() {
        return {
            loading: false,
            $comboBox: null,
            $previewPanel: null,
            previewText: '',
            data: []
        };
    },
    props: {
        value: String,
        remote: {
            type: Object,
            required: true
        },
        filterParams: {
            type: Function,
            required: true
        },
        dataSourceFormatter: Function,
        placeholder: {
            type: String,
            default: '请输入要匹配的文本'
        },
        multiple: {
            type: Boolean,
            default: true
        },
        valueExtractor: {
            type: Function,
            required: true
        },
        textExtractor: {
            type: Function,
            required: true
        }
    },
    methods: {
        handleClickSelect() {
            !this.$comboBox && this.createComboBox();
            this.$comboBox.show();
        },
        handleClickPreviewButton() {
            !this.$previewPanel && this.createPreviewPanel();
            this.$previewPanel.show();
        },
        createComboBox() {
            this.$comboBox = new ComboBox().injectContext(this, this.preferences()).$mount();
            document.body.appendChild(this.$comboBox.$el);
        },
        createPreviewPanel() {
            this.$previewPanel = new PreviewPanel().injectContext(this).$mount();
            document.body.appendChild(this.$previewPanel.$el);
        },
        setPreviweBar(data) {
            const valueStr = data
                .map(item => {
                    return this.valueExtractor(item.data);
                })
                .join(',');
            this.$set(this, 'previewText', valueStr);
            this.$emit('input', valueStr);
        },
        preferences() {
            return {
                text: this.textExtractor,
                value: this.valueExtractor,
                remote: this.remote,
                multiple: this.multiple,
                placeholder: this.placeholder,
                filterParams: this.filterParams,
                dataSourceFormatter: this.dataSourceFormatter
            };
        }
    }
};
