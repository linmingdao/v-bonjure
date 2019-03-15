import ComboBox from './combo-box';
import PreviewPanel from './preview-panel';

export default {
    data() {
        return {
            loading: false,
            $comboBox: null,
            $previewPanel: null,
            data: []
        };
    },
    props: {
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
        value: {
            type: Function,
            required: true
        },
        text: {
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
        preferences() {
            return {
                text: this.text,
                value: this.value,
                remote: this.remote,
                multiple: this.multiple,
                placeholder: this.placeholder,
                filterParams: this.filterParams,
                dataSourceFormatter: this.dataSourceFormatter
            };
        }
    }
};