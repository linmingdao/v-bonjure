import Vue from 'vue';
import {
    MESSAGE_TYPE,
    defaultLoadingOption,
    defaultAlertOption,
    defaultConfirmOption,
    defaultMessageOption,
    defaultOption
} from './option';

// Notification 是基于 ElementUI 的，获取 ElementUI $loading等各种弹窗服务
const $alert = Vue.prototype.$alert;
const $confirm = Vue.prototype.$confirm;
const $message = Vue.prototype.$message;
const $loading = Vue.prototype.$loading;
// const $prompt = Vue.prototype.$prompt;
// const $msgbox = Vue.prototype.$msgbox;

/**
 * 消息通知中心, 主要负责:
 * 1、各种消息弹窗的显示与隐藏;
 * 2、loading弹窗的显示与隐藏
 */
export default class Notification {
    constructor(opt = defaultOption) {
        this.config(opt);
        this.loading = null;
    }

    config({ loading, alert, confirm, message }) {
        this.configLoading(loading || defaultLoadingOption)
            .configAltert(alert || defaultAlertOption)
            .configConfirm(confirm || defaultConfirmOption)
            .configMessage(message || defaultMessageOption);

        return this;
    }

    /**
     * loading
     */

    configLoading(opt = defaultLoadingOption) {
        this.loadingOpt = { ...defaultLoadingOption, ...opt };
        return this;
    }

    showLoading(opt = {}) {
        this.loading = $loading({ ...this.loadingOpt, ...opt });
        return this;
    }

    hideLoading() {
        this.loading && this.loading.close();
        return this;
    }

    /**
     * alert
     */

    configAltert(opt = defaultAlertOption) {
        this.alertOpt = { ...defaultAlertOption, ...opt };
        return this;
    }

    alert(msg = '', opt = {}) {
        $alert(msg, { ...this.alertOpt, ...opt });
    }

    alertInfo(msg = '', opt = {}) {
        this.alert(msg, { ...opt, type: MESSAGE_TYPE.INFO, title: '消息' });
    }

    alertWarning(msg = '', opt = {}) {
        this.alert(msg, { ...opt, type: MESSAGE_TYPE.WARNING, title: '警告' });
    }

    alertSuccess(msg = '', opt = {}) {
        this.alert(msg, { ...opt, type: MESSAGE_TYPE.SUCCESS, title: '成功' });
    }

    alertError(msg = '', opt = {}) {
        this.alert(msg, { ...opt, type: MESSAGE_TYPE.ERROR, title: '错误' });
    }

    /**
     * confirm
     */

    configConfirm(opt = defaultConfirmOption) {
        this.confirmOpt = { ...defaultConfirmOption, ...opt };
        return this;
    }

    confirm(msg = '', opt = {}) {
        $confirm(msg, { ...this.confirmOpt, ...opt });
    }

    /**
     * message
     */

    configMessage(opt = defaultMessageOption) {
        this.messageOpt = { ...defaultMessageOption, ...opt };
        return this;
    }

    message(message = '', opt = {}) {
        $message({ ...this.messageOpt, ...opt, message });
    }

    messageInfo(message = '', opt = {}) {
        $message({ ...this.messageOpt, ...opt, type: MESSAGE_TYPE.INFO, message });
    }

    messageWarning(message = '', opt = {}) {
        $message({ ...this.messageOpt, ...opt, type: MESSAGE_TYPE.WARNING, message });
    }

    messageSuccess(message = '', opt = {}) {
        $message({ ...this.messageOpt, ...opt, type: MESSAGE_TYPE.SUCCESS, message });
    }

    messageError(message = '', opt = {}) {
        $message({ ...this.messageOpt, ...opt, type: MESSAGE_TYPE.ERROR, message });
    }

    /**
     * 实例获取静态方法
     */

    static getNotificator(option = defaultOption) {
        return new Notification(option);
    }
};