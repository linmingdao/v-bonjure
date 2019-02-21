import Logger from '@core/Logger';
import notificator from '@core/notificator';
import { isFunction } from '../utils';
import { defaultReqHeader, defaultOption } from './config';

const logger = Logger.getLogger('Global/Http');

/**
 * Http网络请求对象
 */
export default class Http {
    /**
     * 请求客户端构造器
     */
    constructor({ showLoading, useInterceptor, locked, reqheader, onbefore, oncomplete, onsuccess, onerror }) {
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
     * 设置请求头，默认的请求头是只针对处理json数据的：
     * {
     *     'Accept': 'application/json',
     *     'Content-Type': 'application/json',
     *     'mode': 'cors',
     *     'credentials': 'include'
     * }
     * @param {Object} headers 
     */
    headers(headers = {}) {
        !this.locked && (this.reqheader = headers);
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
     * HTTP1.0 RESTful-GET
     * @param {*} api 
     * @param {*} headers 
     */
    get(api, headers = {}) {
        return _fetch.call(this, 'GET', api, {}, headers);
    }

    /**
     * HTTP1.0 RESTful-POST
     * @param {*} api 
     * @param {*} data 
     * @param {*} headers 
     */
    post(api, data, headers = {}) {
        return _fetch.call(this, 'POST', api, data, headers);
    }

    /**
     * HTTP1.0 RESTful-HEAD
     * @param {*} api 
     */
    head(api, data, headers = {}) {
        return _fetch.call(this, 'HEAD', api, data, headers);
    }

    /**
     * HTTP1.1 RESTful-OPTIONS
     * @param {*} api 
     */
    // options(api, data, headers = {}) {
    //     return _fetch.call(this, 'OPTIONS', api, data, headers);
    // }

    /**
     * HTTP1.1 RESTful-PUT
     * @param {*} api 
     */
    put(api, data, headers = {}) {
        return _fetch.call(this, 'PUT', api, data, headers);
    }

    /**
     * HTTP1.1 RESTful-PATCH
     * @param {*} api 
     */
    patch(api, data, headers = {}) {
        return _fetch.call(this, 'PATCH', api, data, headers);
    }

    /**
     * HTTP1.1 RESTful-DELETE
     * @param {*} api 
     */
    delete(api, data, headers = {}) {
        return _fetch.call(this, 'DELETE', api, data, headers);
    }

    /**
     * HTTP1.1 RESTful-TRACE 
     * @param {*} api 
     */
    // trace(api, data, headers = {}) {
    //     return _fetch.call(this, 'TRACE', api, data, headers);
    // }

    /**
     * HTTP1.1 RESTful-CONNECT
     * @param {*} api 
     */
    // connect(api, data, headers = {}) {
    //     return _fetch.call(this, 'CONNECT', api, data, headers);
    // }

    /**
     * 获取一个Http网络请求客户端实例
     */
    static getClient(opt = defaultOption) {
        return new Http(opt);
    }
};

/**
 * 私有方法_封装底层fetch api
 * @param {String} api 
 * @param {Object} body 
 * @param {Object} reqheader 
 */
function _fetch(method, api, data = {}, headers = {}) {
    // 若该客户端已上锁，则不响应请求方法设置的请求头信息
    this.locked && (headers = {});

    return new Promise((resolve, reject) => {
        logger.debug(`发送请求, ${method}, ${api}`, data);

        // 请求开始,显示全局loading
        this.showLoading && notificator.showLoading();

        // 执行请求开始的回调
        isFunction(this.onbefore) && this.onbefore(this);

        // 生成fetch请求的配置信息
        const opt = {
            method,
            headers: {
                ...defaultReqHeader,
                ...this.reqheader,
                ...headers
            }
        };
        method !== 'GET' && (opt['body'] = JSON.stringify(data));

        // 发出请求
        fetch(api, opt).then(response => {
            if (response.ok) {
                handleResponse.call(this, response, resolve, method, api);
            } else {
                // 返回错误的response，用于被外层catch块捕获
                return Promise.reject(response);
            }
        }).catch(exception => {
            handleException.call(this, exception, method, api);
        }).finally(() => {
            // 隐藏loading
            this.showLoading && notificator.hideLoading();
            // 执行请求结束的回调
            isFunction(this.oncomplete) && this.oncomplete(this);
        });
    });
}

function handleResponse(response, resolve, method, api) {
    return response.json().then(json => {
        const responseJson = JSON.parse(json);
        // 拦截请求结果
        this.useInterceptor && isFunction(this.interceptor) && this.interceptor(responseJson);
        // 执行请求成功的回调
        isFunction(this.onsuccess) && this.onsuccess(responseJson, this);
        // 打印日志
        logger.debug(`返回请求, ${method}, ${api}`, responseJson);
        // 返回响应数据
        resolve(responseJson);
    });
}

function handleException(exception, method, api) {
    // 日志输出异常信息
    logger.error(`请求异常, ${method}, ${api}`, exception);

    // 执行请求失败的回调
    if (isFunction(this.onerror)) {
        const ret = this.onerror(exception, this);
        if (ret) return;
    }

    // 弹窗提示异常信息
    notificator.alertError(`${exception.status} ${exception.statusText}：${exception.url}`);
}