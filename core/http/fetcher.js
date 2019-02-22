import Logger from '@core/Logger';
import notificator from '@core/notificator';
import { isFunction } from '../utils';
import { defaultReqHeader } from './config';

const logger = Logger.getLogger('Global/Http');

/**
 * 封装真正的请求执行对象(本质是封装了底层较为难用的fetch api)
 */
export default class Fetcher {
    /**
     * 执行请求
     * @param {String} api 
     * @param {Object} body 
     * @param {Object} reqheader 
     */
    executeRequest(method, api, data = {}, headers = {}) {
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
                    this.handleResponse(response, resolve, method, api);
                } else {
                    // 返回错误的response，用于被外层catch块捕获
                    return Promise.reject(response);
                }
            }).catch(exception => {
                this.handleException(exception, method, api);
            }).finally(() => {
                // 隐藏loading
                this.showLoading && notificator.hideLoading();
                // 执行请求结束的回调
                isFunction(this.oncomplete) && this.oncomplete(this);
            });
        });
    }

    handleResponse(response, resolve, method, api) {
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

    handleException(exception, method, api) {
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
};