import Http from '@core/Http';
import notificator from '@core/notificator';

export default {
    data() {
        return {}
    },
    methods: {
        testDefaultHttpExceptionHandler(type) {
            if (type === 404) {
                Http.getClient().get('/exception_404');
            } else {
                Http.getClient().get('/exception_500');
            }
        },
        testCustomHttpExceptionHandler(type) {
            const customHttpClient = Http.getClient().error(err => {
                notificator.messageError(`${err.status} ${err.statusText}：${err.url}`);
                // 返回true, 代表不使用http模块默认的异常处理
                return true;
            });
            if (type === 404) {
                customHttpClient.get('/exception_404');
            } else {
                customHttpClient.get('/exception_500');
            }
        },
        testRESTfulApiMethod(method) {

        }
    }
};