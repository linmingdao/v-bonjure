import Fetcher from './fetcher';

/**
 * RESTful风格的http请求客户端
 */
export default class RESTfulClient extends Fetcher {
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
     * HTTP1.0 RESTful-GET
     * @param {*} api 
     * @param {*} headers 
     */
    get(api, headers = {}) {
        return this.executeRequest('GET', api, {}, headers);
    }

    /**
     * HTTP1.0 RESTful-POST
     * @param {*} api 
     * @param {*} data 
     * @param {*} headers 
     */
    post(api, data, headers = {}) {
        return this.executeRequest('POST', api, data, headers);
    }

    /**
     * HTTP1.0 RESTful-HEAD
     * @param {*} api 
     */
    head(api, data, headers = {}) {
        return this.executeRequest('HEAD', api, data, headers);
    }

    /**
     * HTTP1.1 RESTful-PUT
     * @param {*} api 
     */
    put(api, data, headers = {}) {
        return this.executeRequest('PUT', api, data, headers);
    }

    /**
     * HTTP1.1 RESTful-PATCH
     * @param {*} api 
     */
    patch(api, data, headers = {}) {
        return this.executeRequest('PATCH', api, data, headers);
    }

    /**
     * HTTP1.1 RESTful-DELETE
     * @param {*} api 
     */
    delete(api, data, headers = {}) {
        return this.executeRequest('DELETE', api, data, headers);
    }

    /**
     * HTTP1.1 RESTful-OPTIONS 没有使用场景, 暂不实现
     * @param {*} api 
     */
    // options(api, data, headers = {}) {
    //     return this.executeRequest('OPTIONS', api, data, headers);
    // }

    /**
     * HTTP1.1 RESTful-TRACE 没有使用场景, 暂不实现
     * @param {*} api 
     */
    // trace(api, data, headers = {}) {
    //     return this.executeRequest('TRACE', api, data, headers);
    // }

    /**
     * HTTP1.1 RESTful-CONNECT 没有使用场景, 暂不实现
     * @param {*} api 
     */
    // connect(api, data, headers = {}) {
    //     return this.executeRequest('CONNECT', api, data, headers);
    // }
};