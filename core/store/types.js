/**
 * mutation类型
 */
export const MUTATIONS = {
    // 将应用的状态置为pending状态，应用可以根据该标识显示loading效果
    'ENABLE_PENDING': 'enablePending',
    // 将应用的状态置为非pending状态，应用可以根据该标识隐藏loading效果
    'DISABLE_PENDING': 'disablePending',
    // 显示消息吐司
    'SHOW_TOAST': 'showToast'
};