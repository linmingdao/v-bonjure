import { MESSAGE_TYPE } from '../option';
export default {
    props: {
        // 通知类型
        type: {
            type: String,
            default: MESSAGE_TYPE.INFO
        },
        // 通知信息
        message: {
            type: String,
            default: ''
        },
        // 标题
        title: {
            type: String,
            default: '提示'
        },
        // 自定义HTML开关，打开后直接解析message
        dangerouslyUseHTMLString: {
            type: Boolean,
            default: false
        },
        // 显示关闭按钮
        showCloseButton: {
            type: Boolean,
            default: true
        },
        // 显示取消按钮
        showCancelButton: {
            type: Boolean,
            default: false
        },
        // 确认按钮文本
        confirmButtonText: {
            type: String,
            default: '确定'
        },
        // 取消按钮文本
        cancelButtonText: {
            type: String,
            default: '取消'
        },
        // 点击遮罩关闭
        closeOnClickModal: {
            type: Boolean,
            default: false
        },
        // 回调函数，携带option
        callback: {
            type: Function,
            default: function() {}
        },
        // 内容高度，默认自动扩展，设置高度将会取消自动扩展，高度不足显示滚动条
        height: {
            type: Number
        },
        // 内容宽度，默认自动扩展，设置宽度将会取消自动扩展，宽度不足显示滚动条
        width: {
            type: Number
        },
        // 显示Icon
        showIcon: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isShowMessageBox: true,
            isKeep: true
        };
    },
    computed: {
        iconClass() {
            let dict = {
                [MESSAGE_TYPE.INFO]: 'el-icon-info',
                [MESSAGE_TYPE.WARNING]: 'el-icon-warning',
                [MESSAGE_TYPE.SUCCESS]: 'el-icon-success',
                [MESSAGE_TYPE.ERROR]: 'el-icon-error'
            };
            return dict[this.type];
        },
        contentHeight() {
            let style = {};
            if (this.height) {
                style['height'] = this.height + 'px';
            }
            return style;
        },
        messageWidth() {
            let style = {};
            if (this.width) {
                style['width'] = this.width + 'px';
                style['display'] = 'block';
            }
            if (this.showIcon) {
                style['padding-left'] = '50px';
            } else {
                style['padding-left'] = '10px';
            }
            return style;
        }
    },
    methods: {
        cancel(e) {
            if (e === 'mask' && !this.closeOnClickModal) {
                return false;
            }
            this.callback('cancel');
            this.isShowMessageBox = false;
            this.remove();
        },
        confirm() {
            this.callback('confirm');
            this.isShowMessageBox = false;
            this.remove();
        },
        close() {
            this.callback('close');
            this.isShowMessageBox = false;
            this.remove();
        },
        remove: function() {
            this.isKeep = false;
            this.$nextTick(() => {
                this.$destroy();
            });
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs['wrap'].focus();
        });
    }
};
