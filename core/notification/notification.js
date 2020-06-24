import Vue from 'vue';
import messageBox from './messageBox/index.vue';
import Logger from '@core/logger';
import {
    MESSAGE_TYPE,
    defaultLoadingOption,
    defaultAlertOption,
    defaultConfirmOption,
    defaultMessageOption,
    defaultOption
} from './option';

// Notification 一部分采用ElementUI，一部分采用封装组件
const $loading = Vue.prototype.$loading;
const $message = Vue.prototype.$message;
const MessageInstance = Vue.extend(messageBox);
const $messageBox = (message, options) => {
    let current = new MessageInstance();
    Object.assign(current, { message, ...options });
    document.body.appendChild(current.$mount().$el);
};

const logger = Logger.getLogger('notification');

// 只显示一个 alert 消息弹窗
let isAlwaysOneAlert = false;
// 当前 alert 消息弹窗的数量
let alertCnt = 0;

// 当前 confirm 弹窗的数量
let confirmCnt = 0;

// 只显示一个 alert 消息弹窗
let isAlwaysOneConfirm = false;

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

    /**
     * alert 消息弹出框计数+1
     */
    static increaseAlertCnt() {
        alertCnt++;
        logger.debug('exec increaseAlertCnt, alertCnt: ', alertCnt);
    }
    /**
     * alert 消息弹出框计数-1
     */
    static decreaseAlertCnt() {
        alertCnt && alertCnt--;
        logger.debug('exec decreaseAlertCnt, alertCnt: ', alertCnt);
    }
    /**
     * 设置同时只能显示一个 alert 消息弹出框
     */
    static enableAlwaysOneAlert() {
        isAlwaysOneAlert = true;
        logger.debug('exec enableAllowAlertOnce, isAlwaysOneAlert: ', isAlwaysOneAlert);
    }
    /**
     * 设置同时可显示多个 alert 消息弹出框
     */
    static disableAlwaysOneAlert() {
        isAlwaysOneAlert = false;
        logger.debug('exec disableAllowAlertOnce, isAlwaysOneAlert: ', isAlwaysOneAlert);
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
        logger.debug(`exec alert, isAlwaysOneAlert: ${isAlwaysOneAlert}, alertCnt: ${alertCnt}`);
        if (isAlwaysOneAlert && alertCnt) return;
        const userCb = opt.callback || this.alertOpt.callback;
        $messageBox(msg, {
            ...this.alertOpt,
            ...opt,
            callback: function(action) {
                Notification.decreaseAlertCnt();
                userCb.call(this, action);
            }
        });
        Notification.increaseAlertCnt();
    }

    alertInfo(msg = '', opt = {}) {
        this.alert(msg, { ...this.alertOpt, ...opt, type: MESSAGE_TYPE.INFO, title: '消息' });
    }

    alertWarning(msg = '', opt = {}) {
        this.alert(msg, { ...this.alertOpt, ...opt, type: MESSAGE_TYPE.WARNING, title: '警告' });
    }

    alertSuccess(msg = '', opt = {}) {
        this.alert(msg, { ...this.alertOpt, ...opt, type: MESSAGE_TYPE.SUCCESS, title: '成功' });
    }

    alertError(msg = '', opt = {}) {
        this.alert(msg, { ...this.alertOpt, ...opt, type: MESSAGE_TYPE.ERROR, title: '错误' });
    }

    /**
     * confirm
     */

    /**
     * confirm 消息弹出框计数+1
     */
    static increaseConfirmCnt() {
        confirmCnt++;
        logger.debug('exec increaseConfirmCnt, confirmCnt: ', confirmCnt);
    }
    /**
     * confirm 消息弹出框计数-1
     */
    static decreaseConfirmCnt() {
        confirmCnt && confirmCnt--;
        logger.debug('exec decreaseConfirmCnt, confirmCnt: ', confirmCnt);
    }
    /**
     * 设置同时只能显示一个 confirm 消息弹出框
     */
    static enableAlwaysOneConfirm() {
        isAlwaysOneConfirm = true;
        logger.debug('exec enableAlwaysOneConfirm, isAlwaysOneConfirm: ', isAlwaysOneConfirm);
    }
    /**
     * 设置同时可显示多个 confirm 消息弹出框
     */
    static disableAlwaysOneConfirm() {
        isAlwaysOneConfirm = false;
        logger.debug('exec disableAlwaysOneConfirm, isAlwaysOneConfirm: ', isAlwaysOneConfirm);
    }

    configConfirm(opt = defaultConfirmOption) {
        this.confirmOpt = { ...defaultConfirmOption, ...opt };
        return this;
    }

    confirm(msg = '', opt = {}) {
        logger.debug(`exec confirm, isAlwaysOneConfirm: ${isAlwaysOneConfirm}, confirmCnt: ${confirmCnt}`);
        if (isAlwaysOneConfirm && confirmCnt) return;
        const userCb = opt.callback || this.confirmOpt.callback;
        $messageBox(msg, {
            ...this.confirmOpt,
            ...opt,
            callback: function(action) {
                Notification.decreaseConfirmCnt();
                userCb.call(this, action);
            }
        });
        Notification.increaseConfirmCnt();
    }

    confirmInfo(msg = '', opt = {}) {
        this.confirm(msg, { ...this.confirmOpt, ...opt, type: MESSAGE_TYPE.INFO, title: '消息' });
    }

    confirmWarning(msg = '', opt = {}) {
        this.confirm(msg, { ...this.confirmOpt, ...opt, type: MESSAGE_TYPE.WARNING, title: '警告' });
    }

    confirmSuccess(msg = '', opt = {}) {
        this.confirm(msg, { ...this.confirmOpt, ...opt, type: MESSAGE_TYPE.SUCCESS, title: '成功' });
    }

    confirmError(msg = '', opt = {}) {
        this.confirm(msg, { ...this.confirmOpt, ...opt, type: MESSAGE_TYPE.ERROR, title: '错误' });
    }

    /**
     * message
     */

    configMessage(opt = defaultMessageOption) {
        this.messageOpt = { ...defaultMessageOption, ...opt };
        return this;
    }

    message(message = '', opt = {}) {
        return $message({ ...this.messageOpt, ...opt, message });
    }

    messageInfo(message = '', opt = {}) {
        return $message({
            ...this.messageOpt,
            ...opt,
            type: MESSAGE_TYPE.INFO,
            message
        });
    }

    messageWarning(message = '', opt = {}) {
        return $message({
            ...this.messageOpt,
            ...opt,
            type: MESSAGE_TYPE.WARNING,
            message
        });
    }

    messageSuccess(message = '', opt = {}) {
        return $message({
            ...this.messageOpt,
            ...opt,
            type: MESSAGE_TYPE.SUCCESS,
            message
        });
    }

    messageError(message = '', opt = {}) {
        return $message({
            ...this.messageOpt,
            ...opt,
            type: MESSAGE_TYPE.ERROR,
            message
        });
    }

    /**
     * 实例获取静态方法
     */

    static getNotificator(option = defaultOption) {
        return new Notification(option);
    }
}
