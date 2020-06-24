import utils from '@utils';
import RESTfulClient from './restfulClient';
import { alertError, overrideNotifier } from './notifier.js';

/**
 * 判断是否是有效的HTTP事件
 * @param {String} event
 */
function isEventNameAvailable(event) {
    return ['before', 'complete', 'success', 'error'].includes(event);
}

/**
 * Http网络请求对象
 */
export default class Http extends RESTfulClient {
    /**
     * 请求客户端构造器
     */
    constructor({
        isShowLoading = true,
        interceptor,
        onbefore,
        onsuccess,
        onerror = function(response) {
            if (response.hasOwnProperty('status')) {
                alertError(`${response.status} ${response.statusText}：${response.url}`);
            } else {
                alertError('请求接口超时或者是未知的网络问题');
            }
        },
        oncomplete
    }) {
        super();
        this.isLocked = false;
        // 请求开始前是否要显示全屏loading动画，请求结束会自动关闭loading动画
        this.isShowLoading = isShowLoading;
        this.interceptor = interceptor;
        // 以下是请求不同状态的回调事件
        this.onbefore = onbefore;
        this.onsuccess = onsuccess;
        this.onerror = onerror;
        this.oncomplete = oncomplete;
    }

    /**
     * 注册请求状态的事件回调函数
     * @param {String} event
     * @param {Function} cb
     */
    on(event, cb) {
        !this.isLocked && isEventNameAvailable(event) && utils.isFunction(cb) && (this[`on${event}`] = cb);
        return this;
    }

    /**
     * 启用拦截器
     * @param {Function} interceptor
     */
    enableInterceptor(interceptor) {
        !this.isLocked && utils.isFunction(interceptor) && (this.interceptor = interceptor);
        return this;
    }

    /**
     * 复写默认的消息通知组件
     * 注意只需要有选择地复写: alertError, showLoading, hideLoading
     * 如果复写了showLoading, 那么也必须复写hideLoading
     * @param {*} component
     */
    overrideNotificator(component = {}) {
        overrideNotifier(component);
        return this;
    }

    /**
     * 启用请求开始前显示全屏loading
     */
    enableLoading() {
        this.isShowLoading = true;
        return this;
    }

    /**
     * 禁用请求开始的全屏loading
     */
    disableLoading() {
        this.isShowLoading = false;
        return this;
    }

    /**
     * 对配置好的请求客户端对象上锁
     */
    lock() {
        this.isLocked = true;
        return this;
    }

    /**
     * 获取一个Http网络请求客户端实例
     */
    static getClient(opt = {}) {
        return new Http(opt);
    }
}
