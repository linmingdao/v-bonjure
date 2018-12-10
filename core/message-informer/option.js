// 消息类型
export const MESSAGE_TYPE = {
    INFO: 'info',
    WARNING: 'warning',
    SUCCESS: 'success',
    ERROR: 'error',
};

// 默认的loading配置
export const defaultLoadingOption = {
    lock: true,
    text: '数据加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
};

// 默认的Alert弹窗配置
export const defaultAlertOption = {};

// 默认的Confirm弹窗配置
export const defaultConfirmOption = {};

// 默认的Prompt弹窗配置
export const defaultPromptOption = {};

// 默认的MsgBox弹窗配置
export const defaultMsgBoxOption = {};

// 默认配置
export const defaultOption = {
    loading: {
        ...defaultLoadingOption
    },
    alert: {
        ...defaultAlertOption
    },
    confirm: {
        ...defaultConfirmOption
    },
    prompt: {
        ...defaultPromptOption
    },
    msgBox: {
        ...defaultMsgBoxOption
    }
};