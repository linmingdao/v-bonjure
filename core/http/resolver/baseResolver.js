import utils from '@utils';

/**
 * Response解析基类
 */
export default class BaseResolver {
    constructor({ response, resolve, reject, context }) {
        this.reject = reject;
        this.context = context;
        this.resolve = resolve;
        this.response = response;
        // 标志是否成功拦截请求
        this.isInterceptSuccessfully = false;
    }

    getResponse() {
        return this.response;
    }

    getResolve() {
        return this.resolve;
    }

    getReject() {
        return this.reject;
    }

    getContext() {
        return this.context;
    }

    setInterceptFlag(flag) {
        this.isInterceptSuccessfully = !!flag;
    }

    getInterceptFlag() {
        return this.isInterceptSuccessfully;
    }

    /**
     * 上报解析结果
     * @param {*} body
     */
    reportResult(body) {
        this.reportToInterceptor(body)
            .reportToApplication(body)
            .reportToSuccessCallback(body);
    }

    /**
     * 将解析结果上报给拦截器
     * @param {*} body
     */
    reportToInterceptor(body) {
        // 获取拦截器
        const { interceptor } = this.getContext();
        // 确实设置了执行拦截器 则 执行拦截器 并 设置拦截器拦截结果的标志位
        if (utils.isFunction(interceptor)) {
            const interceptFlag = interceptor(body, this.getContext(), this.getResponse());
            this.setInterceptFlag(interceptFlag);
        }
        return this;
    }

    /**
     * 将解析结果上报给应用层
     * @param {*} body
     */
    reportToApplication(body) {
        this.getInterceptFlag() ? this.getReject()('请求被拦截器拦截') : this.getResolve()(body);
        return this;
    }

    /**
     * 将解析结果上报给成功的回调钩子
     * @param {*} body
     */
    reportToSuccessCallback(body) {
        // 如果拦截失败，则将body信息递交给成功的钩子
        if (!this.getInterceptFlag()) {
            const { onsuccess } = this.getContext();
            // 执行请求成功的回调
            utils.isFunction(onsuccess) && onsuccess(body, this.context, this.rawResponse);
        }
        return this;
    }
}
