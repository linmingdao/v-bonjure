import utils from '@utils';
import Http from '@core/http';
import notificator from '@core/notificator';
import * as STATUS_CODE from '@app/constants/statusCode.js';

// 构建客户端对象
const httpClient = Http.getClient()
    // 设置公共的查询参数
    .queryParams(
        {
            token: utils.getQueryString('token'),
            projectCode: utils.getQueryString('project_code')
        },
        true,
        true
    )
    // 设置公共的请求头信息
    .headers({ token: utils.getQueryString('token') }, true, true)
    // 配置拦截器
    .enableInterceptor(body => {
        if (body.code !== STATUS_CODE.SUCCESS) {
            notificator.alertWarning(body.message);
            // 表示成功拦截，那么请求就到此为止了（请求结果不会继续上报应用层了）
            return true;
        } else {
            // 表示不进行拦截，那么请求会到应用层
            return false;
        }
    })
    // 配置请求结束之后的回调函数
    .on('complete', function(client) {
        // to do something in complete callback
        client.enableLoading();
    })
    // 上锁配置好的请求客户端，防止被随意更改
    .lock();

export default httpClient;
