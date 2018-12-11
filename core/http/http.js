import Logger from '@vbonjour/Logger';
import { goto } from '@vbonjour/router';
import notificator from '@vbonjour/notificator';
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
    constructor({ showLoading, reqheader, onbefore, oncomplete, onsuccess, onerror }) {
        // 请求开始前是否要显示全屏loading动画，请求结束会自动关闭
        this.showLoading = showLoading || defaultOption['showLoading'];

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
        this.onbefore = callback;
        return this;
    }

    /**
     * 设置请求结束时的回调，无论成功失败都会执行
     * @param {Function} callback 
     */
    complete(callback) {
        this.oncomplete = callback;
        return this;
    }

    /**
     * 设置请求成功时的回调
     * @param {Function} callback 
     */
    success(callback) {
        this.onsuccess = callback;
        return this;
    }

    /**
     * 设置请求错误时的回调
     * @param {Function} callback 
     */
    error(callback) {
        this.onerror = callback;
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
    headers(headers = defaultReqHeader) {
        this.reqheader = headers;
        return this;
    }

    /**
     * 启用请求开始前显示全屏loading
     */
    enableLoading() {
        this.showLoading = true;
        return this;
    }

    /**
     * 禁用请求开始的全屏loading
     */
    disableLoading() {
        this.showLoading = false;
        return this;
    }

    /**
     * RESTful-GET
     * @param {*} api 
     * @param {*} headers 
     */
    get(api, headers = defaultReqHeader) {
        return _fetch.call(this, 'GET', api, {}, headers);
    }

    /**
     * RESTful-POST
     * @param {*} api 
     * @param {*} data 
     * @param {*} headers 
     */
    post(api, data, headers = defaultReqHeader) {
        return _fetch.call(this, 'POST', api, data, headers);
    }

    head(api) {

    }

    put(api) {

    }

    patch(api) {

    }

    delete(api) {

    }

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
function _fetch(method, api, data = {}, headers) {
    return new Promise((resolve, reject) => {
        logger.debug(`发送请求, ${method}, ${api}`, data);

        // 请求开始,显示全局loading
        this.showLoading && notificator.showLoading();

        // 执行请求开始的回调
        isFunction(this.onbefore) && this.onbefore();

        // 生成fetch请求的配置信息
        const opt = {
            method,
            headers: {
                ...this.reqheader,
                ...headers
            }
        };
        method === 'POST' && (opt['body'] = JSON.stringify(data));

        // 发出请求
        fetch(api, opt).then(response => {
            return handleResponse.call(this, response, resolve, reject, method, api);
        }).catch(exception => {
            handleException.call(this, exception, method, api);
        }).finally(() => {
            // 隐藏loading
            this.showLoading && notificator.hideLoading();
            // 执行请求结束的回调
            isFunction(this.oncomplete) && this.oncomplete();
        });
    });
}

function handleResponse(response, resolve, reject, method, api) {
    if (response.ok) {
        return response.json().then(json => {
            const responseJson = JSON.parse(json);
            // 执行请求成功的回调
            isFunction(this.onsuccess) && this.onsuccess(responseJson);
            // 打印日志
            logger.debug(`返回请求, ${method}, ${api}`, responseJson);
            // 返回响应数据
            resolve(responseJson);
        });
    } else {
        // 返回错误的response，用于被外层catch块捕获
        return Promise.reject(response);
    }
}

function handleException(exception, method, api) {
    // 执行请求失败的回调
    isFunction(this.onerror) && this.onerror(exception);

    // 日志输出异常信息
    logger.error(`请求异常, ${method}, ${api}`, exception);

    // TODO: 弹窗提示异常信息
}