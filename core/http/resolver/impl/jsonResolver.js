import utils from '@utils';
import BaseResolver from '../baseResolver';

/**
 * 处理JSON类型的Response响应对象
 */
export default class JsonResolver extends BaseResolver {
    /**
     * 解析response
     */
    doResolve() {
        const response = this.getResponse();
        return response.json().then(body => {
            this.reportResult(utils.isNotEmptyString(body) ? JSON.parse(body) : body);
        });
    }
}
