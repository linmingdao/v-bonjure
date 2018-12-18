import Http from '@core/Http';
import { goto } from '@core/router';
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
                if (err.status === 404) {
                    goto('/404');
                } else {
                    notificator.messageError(`${err.status} ${err.statusText}：${err.url}`);
                }
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
            switch (method) {
                case 'GET':
                    notificator.alertInfo('GET，HTTP1.0，获取资源，例子：todolist 应用中的获取待办列表');
                    break;
                case 'POST':
                    notificator.alertInfo('POST，HTTP1.0，创建资源，例子：todolist 应用中的创建todo项');
                    break;
                case 'PUT':
                    notificator.alertInfo('PUT，HTTP1.1，更新资源，更新/替换整体资源');
                    break;
                case 'PATCH':
                    notificator.alertInfo('PATCH，HTTP1.1，局部更新资源，例子：todolist 应用中的将todo项设置为已完成');
                    break;
                case 'DELETE':
                    notificator.alertInfo('DELETE，HTTP1.1，删除资源，例子：todolist 应用中的删除todo项');
                    break;
                case 'HEAD':
                    notificator.alertInfo('HEAD，HTTP1.0，于获取报头信息，例如检查 cache 是否被修改，是否过期');
                    break;
                // case 'OPTIONS':
                //     notificator.alertInfo('OPTIONS，HTTP1.1，该方法的首要目的是 Priflight Request');
                //     break;
                // case 'TRACE':
                //     notificator.alertInfo('TRACE，HTTP1.1');
                //     break;
                // case 'CONNECT':
                //     notificator.alertInfo('CONNECT，HTTP1.1');
                //     break;
            }
        }
    }
};