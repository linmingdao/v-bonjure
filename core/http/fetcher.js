import 'whatwg-fetch';
import utils from '@utils';
import Logger from '@core/logger';
import { loadingController } from './notifier.js';
import resolverFactory from './resolver/factory.js';
import BlobResolver from './resolver/blobResolver.js';
import { createHeaders, createRequest, mergeQueryString, replacePlaceholder, buildOptions } from './tools';

const logger = Logger.getLogger('global/http');

/**
 * 封装真正的请求执行对象(本质是封装了底层较为难用的fetch api)
 */
export default class Fetcher {
    /**
     * 处理正常的请求响应体
     * @param {*} response
     * @param {*} resolve
     */
    handleResponse({ response, resolve, reject }) {
        // 生产response对象对应的解析器
        const resolver = resolverFactory.produce({ response, resolve, reject, context: this });
        // 解析response对象并返回解析结果
        return resolver.doResolve();
    }

    /**
     * 处理请求异常
     * @param {*} exception
     * @param {*} reject
     */
    handleException(response, reject) {
        utils.isFunction(this.onerror) && this.onerror(response, this);
        reject(response);
    }

    /**
     * 解析下载请求
     * @param {*} response
     * @param {*} resolve
     */
    handleDownload(response, resolve) {
        // 生产response对象对应的解析器
        const resolver = new BlobResolver(response, resolve, this);
        // 解析response对象并返回解析结果
        return resolver.doResolve();
    }

    /**
     * 请求结束，清理客户端状态
     */
    windUp() {
        // 请求结束，loading计数器自减 1
        this.isShowLoading && loadingController.decrease();
        // 执行请求结束的回调
        utils.isFunction(this.oncomplete) && this.oncomplete(this);
    }

    /**
     * 准备待执行的请求对象
     * @param {*} method
     * @param {*} url
     * @param {*} data
     * @param {*} isUpload
     */
    prepareRequest(method, url, data, isUpload = false) {
        // 执行请求开始的回调
        utils.isFunction(this.onbefore) && this.onbefore(this);
        // url拼接用户设定的查询参数
        url = mergeQueryString(url, { ...this.globalQueryParams, ...this.temporaryQueryParams });
        // 替换url的占位符信息
        url = replacePlaceholder(url, { ...this.globalPlaceholder, ...this.temporaryPlaceholder });
        // 生成请求头对象
        const headers = createHeaders({ ...this.globalHeaders, ...this.temporaryHeader }, isUpload);
        // 清空单次请求的 请求头配置信息 、 查询参数配置信息 和 占位符信息
        this.flushHeaders()
            .flushQueryParams()
            .flushPlaceholder();
        // 构建请求的配置对象
        const options = buildOptions(headers, method, data);
        // 创建请求对象
        const request = createRequest(url, options);
        return request;
    }

    /**
     * 准备执行请求
     * @param {*} method
     * @param {*} url
     * @param {*} data
     */
    prepareExecuteRequest(method, url, data) {
        // 准备待执行的请求对象
        const request = this.prepareRequest(method, url, data);
        // 输出日志
        logger.info(`执行了请求, ${method}: ${url}, data:`, data);
        // 执行真正的请求
        return this.executeRequest(request);
    }

    /**
     * 执行请求
     * @param {Object} request
     */
    executeRequest(request) {
        return new Promise((resolve, reject) => {
            // 请求开始，loading计数器自增 1
            this.isShowLoading && loadingController.increase();
            // 发出请求
            fetch(request)
                .then(response =>
                    response.ok ? this.handleResponse({ response, resolve, reject }) : Promise.reject(response)
                )
                .catch(response => this.handleException(response, reject))
                .finally(() => this.windUp());
        });
    }

    /**
     * 执行文件下载
     * @param {*} url
     * @param {*} method
     * @param {*} data
     */
    download(url, method = 'GET', data) {
        // 准备待执行的请求对象
        const request = this.prepareRequest(method, url, data);
        // 发起请求
        return new Promise((resolve, reject) => {
            // 请求开始，loading计数器自增 1
            this.isShowLoading && loadingController.increase();
            fetch(request)
                .then(response => (response.ok ? this.handleDownload(response, resolve) : Promise.reject(response)))
                .catch(response => this.handleException(response, reject))
                .finally(() => this.windUp());
        });
    }

    /**
     * 文件上传
     * @param {*} url
     * @param {*} formData
     * @param {*} method
     */
    upload(url, formData, method = 'POST') {
        // 准备待执行的请求对象
        const request = this.prepareRequest(method, url, formData, true);
        // 发起请求
        return new Promise((resolve, reject) => {
            // 请求开始，loading计数器自增 1
            this.isShowLoading && loadingController.increase();
            // 发出请求
            fetch(request)
                .then(response =>
                    response.ok ? this.handleResponse({ response, resolve, reject }) : Promise.reject(response)
                )
                .catch(response => this.handleException(response, reject))
                .finally(() => this.windUp());
        });
    }
}
