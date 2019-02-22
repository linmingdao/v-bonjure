import RESTfulClient from './restfulClient';
import { defaultOption } from './config';

/**
 * Http网络请求对象
 */
export default class Http extends RESTfulClient {
    /**
     * 请求客户端构造器
     */
    constructor({ showLoading, useInterceptor, locked, reqheader, onbefore, oncomplete, onsuccess, onerror }) {
        super();
        // 请求开始前是否要显示全屏loading动画，请求结束会自动关闭
        this.showLoading = showLoading || defaultOption['showLoading'];

        // 默认启用拦截器
        this.useInterceptor = typeof useInterceptor !== 'undefined' ? useInterceptor : defaultOption['useInterceptor'];

        // 控制是否可以配置客户端
        this.locked = typeof locked !== 'undefined' ? locked : defaultOption['locked'];

        // 用户设置的请求头信息
        this.reqheader = reqheader || defaultOption['reqheader'];

        // 以下是请求不同状态的回调事件
        this.onbefore = onbefore || defaultOption['onbefore'];
        this.oncomplete = oncomplete || defaultOption['oncomplete'];
        this.onsuccess = onsuccess || defaultOption['onsuccess'];
        this.onerror = onerror || defaultOption['onerror'];
    }

    /**
     * 设置请求开始前的回调
     * @param {Function} callback
     */
    before(callback) {
        !this.locked && (this.onbefore = callback);
        return this;
    }

    /**
     * 设置请求结束时的回调，无论成功失败都会执行
     * @param {Function} callback
     */
    complete(callback) {
        !this.locked && (this.oncomplete = callback);
        return this;
    }

    /**
     * 设置请求成功时的回调
     * @param {Function} callback
     */
    success(callback) {
        !this.locked && (this.onsuccess = callback);
        return this;
    }

    /**
     * 设置请求错误时的回调
     * @param {Function} callback
     */
    error(callback) {
        !this.locked && (this.onerror = callback);
        return this;
    }

    /**
     * 拦截请求结果
     * @param {Function} callback
     */
    intercept(callback) {
        !this.locked && (this.interceptor = callback);
        return this;
    }

    /**
     * 启用拦截器
     */
    disableInterceptor() {
        !this.locked && (this.useInterceptor = false);
        return this;
    }

    /**
     * 禁用拦截器
     */
    enableInterceptor() {
        !this.locked && (this.useInterceptor = true);
        return this;
    }

    /**
     * 启用请求开始前显示全屏loading
     */
    enableLoading() {
        !this.locked && (this.showLoading = true);
        return this;
    }

    /**
     * 禁用请求开始的全屏loading
     */
    disableLoading() {
        !this.locked && (this.showLoading = false);
        return this;
    }

    /**
     * 上锁，该请求客户端对象将不再响应配置的变更
     */
    lock() {
        this.locked = true;
        // Object.freeze(this);
        return this;
    }

    /**
     * 为了防止客户端对象被篡改，不提供解锁方法
     */
    // unlock() {
    //     this.locked = false;
    //     return this;
    // }

    /**
     * 获取一个Http网络请求客户端实例
     */
    static getClient(opt = defaultOption) {
        return new Http(opt);
    }
};