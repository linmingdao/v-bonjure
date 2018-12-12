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
export const defaultAlertOption = {
    title: '提示',
    // type: MESSAGE_TYPE.INFO,
    confirmButtonText: '确定',
    callback: action => {}
};

// 默认的Confirm弹窗配置
export const defaultConfirmOption = {
    lock: true,
    title: '提示',
    closeOnClickModal: false,
    type: MESSAGE_TYPE.WARNING,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    callback: action => {}
};

// 默认的Message弹窗配置
export const defaultMessageOption = {
    // type: MESSAGE_TYPE.INFO,
    message: ''
};

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
    message: {
        ...defaultMessageOption
    }
};