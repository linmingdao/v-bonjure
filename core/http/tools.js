/**
 * 获取默认的请求头配置信息
 */
export function defaultReqHeaders() {
    return {
        mode: 'cors',
        credentials: 'include',
        'Accept-Charset': 'utf-8',
        accept: 'application/json',
        // 常用的 Content-Type 请求头：
        // application/x-www-form-urlencoded，
        // multipart/form-data，
        // text/xml
        'Content-Type': 'application/json'
    };
}

/**
 * 创建fetch的请求header对象
 * @param {Object} headers
 * @param {Object} isUpload
 */
export function createHeaders(headers = {}, isUpload = false) {
    // 为了防止用户在指定请求头的时候大小不统一，fetch会自动将请求头统一转小写
    const h = { ...defaultReqHeaders(), ...headers };
    // 保证formDat里的数据boundary和Request Header里的boundary一致，需要手动删除Content-Type=multipart/form-data的请求头
    isUpload && delete h['Content-Type'];
    return new Headers(h);
}

/**
 * 创建fetch的请求对象
 * @param {String} url
 * @param {Object} options
 */
export function createRequest(url, options = {}) {
    const { method = 'GET' } = options;
    return new Request(url, {
        method,
        mode: 'cors',
        cache: 'default',
        'Cache-Control': 'max-age=300',
        credentials: 'include',
        ...options
    });
}

/**
 * 拼接用户指定的查询查询
 * @param {String} url
 * @param {Object} query
 */
export function mergeQueryString(url, query = {}) {
    const queryStr = convertObject2QueryString(query);
    return queryStr ? `${url}${url.includes('?') ? '&' : '?'}${queryStr}` : url;
}

/**
 * 替换url中的占位符信息
 * @param {String} url
 * @param {Object} placeholderInfo
 */
export function replacePlaceholder(url, placeholderInfo) {
    const placeholderArray = Object.keys(placeholderInfo);
    if (placeholderArray.length) {
        placeholderArray.forEach(placeholder => {
            url = url.replace(new RegExp(placeholder, 'gm'), placeholderInfo[placeholder]);
        });
    }
    return url;
}

/**
 * 对象转a=1&b=3这种查询字符串形式
 * @param {*} object
 */
export function convertObject2QueryString(object = {}) {
    return Object.keys(object)
        .map(key => `${key}=${object[key]}`)
        .join('&');
}

/**
 * 将用户post、put、patch的data转换成fetch支持的格式
 * @param {*} contentType
 * @param {*} data
 */
export function convertData2BodyByContentType(contentType, data) {
    switch (contentType) {
        case 'application/json':
            typeof data === 'object' && (data = JSON.stringify(data));
            break;
        case 'application/x-www-form-urlencoded':
            typeof data === 'object' && (data = convertObject2QueryString(data));
            break;
        default:
    }
    return data;
}

/**
 * 构建请求的配置对象
 * @param {*} headers
 * @param {*} method
 * @param {*} data
 */
export function buildOptions(headers, method, data) {
    return ['GET', 'HEAD'].includes(method)
        ? { method, headers }
        : { method, headers, body: convertData2BodyByContentType(headers.get('Content-Type'), data) };
}
