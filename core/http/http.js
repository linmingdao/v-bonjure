import Logger from 'logger';
import LoadingBox from 'loadingBox';
import { isFunction } from '../utils';

const logger = Logger.getLogger('Global/Http');
const loadingBox = LoadingBox.getInstance();

/**
 * Http网络请求对象
 */
export default class Http {

    /**
     * 请求客户端构造器
     */
    constructor(opt = {}) {
        // 请求开始前是否要显示全屏loading动画，请求结束会自动关闭
        this.isShowLoading = opt['isShowLoading'] || true;

        // 用户设置的请求头信息
        this.reqheader = opt['reqheader'] || {};

        // 以下是请求不同状态的回调事件
        this.onbefore = opt['onbefore'] || null;
        this.oncomplete = opt['oncomplete'] || null;
        this.onsuccess = opt['onsuccess'] || null;
        this.onerror = opt['onerror'] || null;
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
     *     'mode': 'cors'
     * }
     * @param {Object} headers 
     */
    headers(headers = {}) {
        this.reqheader = headers;
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

    get(api) {
        return _fetch.call(this, 'GET', api, {}, this.reqheader, this.isShowLoading);
    }

    /**
     * RESTful-POST
     * @param {*} api 
     * @param {*} data 
     */
    post(api, data) {
        return _fetch.call(this, 'POST', api, data, this.reqheader, this.isShowLoading);
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
    static getClient(opt = {}) {
        return new Http(opt);
    }
};

/**
 * 私有方法_显示全屏loading
 */
function showLoading() {
    loadingBox.showLoading();
}

/**
 * 私有方法_隐藏全屏loading
 */
function hideLoading() {
    loadingBox.hideLoading();
}

/**
 * 私有方法_封装底层fetch api
 * @param {String} api 
 * @param {Object} body 
 * @param {Object} reqheader 
 */
function _fetch(method, api, data = {}) {
    return new Promise((resolve, reject) => {
        logger.debug(`发送请求, ${method}, ${api}`, data);

        // 请求开始,显示全局loading
        this.isShowLoading && showLoading.call(this);

        // 执行请求开始的回调
        isFunction(this.onbefore) && this.onbefore();

        // 生成fetch请求的配置信息
        const opt = {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'credentials': 'include',
                ...this.reqheader
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
            this.isShowLoading && hideLoading.call(this);
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