import BaseResolver from '../baseResolver';

/**
 * 处理Text类型的Response响应对象
 */
export default class TextResolver extends BaseResolver {
    /**
     * 解析response
     */
    doResolve() {
        const response = this.getResponse();
        return response.text().then(body => this.reportResult(body));
    }
}
