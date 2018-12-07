## http模块

用法
```
// 不用关心模块的路径，在应用的任何地方都可以直接使用下面方式引入http模块
import HttpClient from 'httpClient';

// HttpClient的使用，特点：链式调用
export async function testHttpClient({ username, password }) {
    // 获取一个客户端实例，可以通过new HttpClient()的方式，也可以通过HttpClient.getClient()的方式
    const response = await HttpClient.getClient()
        // 设置请求头
        .headers({
            'X-XSRF-TOKEN': 'asff-wera-wer23-34124rf-ewrq2'
        })
        // 设置请求开始前的回调
        .before(function() {
            console.log('onbefore');
        })
        // 设置请求失败的回调
        .error(function(err) {
            console.log('onerror');
            console.log(err);
        })
        // 设置请求结束时的回调，无论成功失败都会执行
        .complete(function() {
            console.log('oncomplete');
        })
        // 设置请求成功时的回调
        .success(function(data) {
            console.log('onsuccess');
            console.log(data);
        })
        // 启用请求开始前显示全屏loading，默认是启用的
        .enableLoading()
        // 禁用请求开始的全屏loading
        .disableLoading()
        // 发起POST请求
        .post(API.LOGIN, { username, password });

    // 返回服务端响应的数据
    return response;
};
```