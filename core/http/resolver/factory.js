import mapper from './mapper.js';

export default {
    /**
     * 生产Response对象的解析器
     * @param {*} response
     * @param {*} resolve
     * @param {*} context
     */
    produce({ response, resolve, reject, context }) {
        const contentType = response.headers.get('Content-Type');
        const mimeType = contentType.split(';')[0];
        return new mapper[mimeType]({ response, resolve, context, reject });
    }
};
