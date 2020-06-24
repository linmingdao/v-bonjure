import Fetcher from './fetcher';
import { defaultReqHeaders } from './tools';

/**
 * RESTful风格的http请求客户端
 */
export default class RESTfulClient extends Fetcher {
    constructor() {
        super();
        // 应用于单次请求的 请求头 、 查询参数 和 占位符信息
        this.temporaryHeader = {};
        this.temporaryQueryParams = {};
        this.temporaryPlaceholder = {};
        // 应用于所有请求的 请求头 、 查询参数 和 占位符信息
        this.globalHeaders = defaultReqHeaders();
        this.globalQueryParams = {};
        this.globalPlaceholder = {};
    }

    /**
     * 设置请求头
     * @param {Object} headers
     * @param {Object} isApplyToAllRequest true：应用于所有的请求（所以该请求头会被缓存）;
     *                                     false：该请求头只会被应用于接下来的一次请求
     * @param {Object} isMixin 在 isApplyToAllRequest 为 true 的前提下才会生效 ===>
     *                         true：不会重置而是追加到之前缓存的全局请求头；
     *                         false：全局请求头会被置成新的请求头
     */
    headers(headers = {}, isApplyToAllRequest = false, isMixin = false) {
        if (isApplyToAllRequest && !this.isLocked) {
            this.globalHeaders = isMixin
                ? {
                      ...this.globalHeaders,
                      ...headers
                  }
                : {
                      ...defaultReqHeaders(),
                      ...headers
                  };
        } else {
            this.temporaryHeader = { ...this.temporaryHeader, ...headers };
        }
        return this;
    }

    /**
     * 清空单次请求的请求头配置信息
     */
    flushHeaders() {
        this.temporaryHeader = {};
        return this;
    }

    /**
     * 设置查询参数信息
     * @param {*} query
     * @param {*} isApplyToAllRequest true：应用于所有的请求（所以该请求头会被缓存;
     *                                false：该请求头只会被应用于接下来的一次请求
     * @param {*} isMixin  在 isApplyToAllRequest 为 true 的前提下才会生效 ===>
     *                     true：不会重置而是追加到之前缓存的全局查询参数；
     *                     false：全局查询参数会被置成新的查询参数配置对象
     */
    queryParams(params = {}, isApplyToAllRequest = false, isMixin = false) {
        if (isApplyToAllRequest && !this.isLocked) {
            this.globalQueryParams = isMixin
                ? {
                      ...this.globalQueryParams,
                      ...params
                  }
                : params;
        } else {
            this.temporaryQueryParams = { ...this.temporaryQueryParams, ...params };
        }
        return this;
    }

    /**
     * 清空单次请求的查询参数配置信息
     */
    flushQueryParams() {
        this.temporaryQueryParams = {};
        return this;
    }

    /**
     * 设置占位符信息
     * @param {*} holder
     * @param {*} isApplyToAllRequest true：应用于所有的请求（所以该占位符信息会被缓存;
     *                                false：该占位符信息只会被应用于接下来的一次请求
     * @param {*} isMixin  在 isApplyToAllRequest 为 true 的前提下才会生效 ===>
     *                     true：不会重置而是追加到之前缓存的全局占位符信息；
     *                     false：全局占位符信息会被置成新的占位符配置对象
     */
    placeHolder(holder = {}, isApplyToAllRequest = false, isMixin = false) {
        if (isApplyToAllRequest && !this.isLocked) {
            this.globalPlaceholder = isMixin
                ? {
                      ...this.globalPlaceholder,
                      ...holder
                  }
                : holder;
        } else {
            this.temporaryPlaceholder = { ...this.temporaryPlaceholder, ...holder };
        }
        return this;
    }

    /**
     * 清空单次请求的占位符信息
     */
    flushPlaceholder() {
        this.temporaryPlaceholder = {};
        return this;
    }

    /**
     * HTTP1.0 RESTful-GET
     * @param {*} api
     */
    get(api) {
        return this.prepareExecuteRequest('GET', api, {});
    }

    /**
     * HTTP1.0 RESTful-POST
     * @param {*} api
     * @param {*} data
     */
    post(api, data) {
        return this.prepareExecuteRequest('POST', api, data);
    }

    /**
     * HTTP1.0 RESTful-HEAD
     * @param {*} api
     */
    head(api) {
        return this.prepareExecuteRequest('HEAD', api, {});
    }

    /**
     * HTTP1.1 RESTful-PUT
     * @param {*} api
     * @param {*} data
     */
    put(api, data) {
        return this.prepareExecuteRequest('PUT', api, data);
    }

    /**
     * HTTP1.1 RESTful-PATCH
     * @param {*} api
     * @param {*} data
     */
    patch(api, data) {
        return this.prepareExecuteRequest('PATCH', api, data);
    }

    /**
     * HTTP1.1 RESTful-DELETE
     * @param {*} api
     * @param {*} data
     */
    delete(api, data) {
        return this.prepareExecuteRequest('DELETE', api, data);
    }
}
