import utils from '@utils';

/**
 * Response解析基类
 */
export default class BlobResolver {
    constructor(res, resolve, ctx) {
        this.context = ctx;
        this.response = res;
        this.resolve = resolve;
        // 标志是否成功拦截请求
        this.isInterceptSuccessfully = false;
    }

    getResponse() {
        return this.response;
    }

    getResolve() {
        return this.resolve;
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
     * 将解析结果上报给拦截器
     * @param {*} body
     */
    reportToInterceptor(body) {
        // 获取拦截器
        const { interceptor } = this.getContext();
        // 确实设置了执行拦截器 则 执行拦截器 并 设置拦截器拦截结果的标志位
        utils.isFunction(interceptor) &&
            this.setInterceptFlag(interceptor(body, this.getContext(), this.getResponse()));
        return this;
    }

    /**
     * 将解析结果上报给应用层
     * @param {*} body
     */
    reportToApplication() {
        if (!this.getInterceptFlag()) {
            const response = this.getResponse();
            response.blob().then(blob => {
                const a = document.createElement('a');
                const url = window.URL.createObjectURL(blob);
                const contentDisposition = response.headers.get('Content-Disposition');
                const filename = decodeURI(contentDisposition.split('=')[1]);
                a.href = url;
                a.download = filename;
                a.click();
                window.URL.revokeObjectURL(url);
                this.getResolve()();
            });
        }
        return this;
    }

    /**
     * 将解析结果上报给成功的回调钩子
     * @param {*} body
     */
    reportToSuccessCallback() {
        // 如果拦截失败，则将body信息递交给成功的钩子
        if (!this.getInterceptFlag()) {
            const { onsuccess } = this.getContext();
            // 执行请求成功的回调
            utils.isFunction(onsuccess) && onsuccess('', this.context, this.rawResponse);
        }
        return this;
    }

    doResolve() {
        const response = this.getResponse();
        return response
            .clone()
            .json()
            .then(body => {
                this.reportToInterceptor(utils.isNotEmptyString(body) ? JSON.parse(body) : body);
            })
            .catch(() => {
                this.reportToApplication();
                this.reportToSuccessCallback();
            });
    }
}
