# Http网络模块

Http模块的设计参考了 RESTful API 的相关概念，涵盖了 RESTful API 涉及到的大部分请求方法。框架层默认提供的Http客户端配置足以应对大部分业务场景，同时也提供了Http请求不同阶段的 “钩子函数”，应用开发者可以通过设置这些“钩子”来自定义一个Http请求客户端

## 一、在应用中使用Http模块

### 1、在应用的任何地方通过如下方式便可引入框架的Http服务
```
import Http from '@core/Http';
```
    小贴士: 框架层提供的服务都可以通过 @core 打头的方式引入，应用开发者不用关心该服务实际的路径

### 2、以 demo app 用户登录为例讲解如何使用Http模块
```
import Http from '@core/Http';
import * as API from '../api';
import * as localStorageHelper from '../../utils/localStorageHelper';

/**
 * 发起登录请求
 * @param {*} param0 
 */
export async function login({ username, password }) {
    // 获取一个http客户端
    const httpClient = Http.getClient();

    // 配置该客户端：由于发起请求时登录按钮设置了loading状态，所以这里禁用掉发起请求前默认的loading动画
    httpClient.disableLoading();

    // 发起请求
    const response = await httpClient.post(API.LOGIN, { username, password });

    // 返回响应数据
    return response;
};

```

### 3、获取一个请求客户端并配置要这样分段书写代码显然是不人性化的，框架设计Http模块的时候充分考虑了代码书写的流畅性，提供了链式的方式来获取并配置你的http客户端
```
export async function login({ username, password }) {
    // 获取并配置一个http请求客户端，发起登录请求
    const response = await Http.getClient().headers({ 'token': localStorageHelper.get('token') }).disableLoading().post(API.LOGIN, { username, password });

    // 返回响应数据
    return response;
};
```

## 二、Http模块功能特性

### 1、获取http客户端（Http构造器）

通过如下方式导入的 'Http' 实际上是一个构造函数，用于构造一个http客户端对象
```
import Http from '@core/Http';
```

(1)、通过new关键字的方式构造一个http客户端
```
import Http from '@core/Http';

cont client = new Http();
```

    很显然new的方式是不够人性化的，体现在如下两点：
    * 用户需要翻阅构造http的各种配置项；
    * 一旦你使用了new关键字就代表你开始针对具体编程了，而不是针对抽象编程，即new是高耦合的。

(2)、Http提供了 getClient 静态方法用于获取一个采用默认配置的http客户端对象
```
import Http from '@core/Http';

cont client = Http.getClient();
```

该方式的优势是对象的创建过程对调用者是透明的，其次可以通过ide的智能提示一步一步地通过链式调用的方式配置一个复合用户需求的客户端对象

![image](https://github.com/linmingdao/v-bonjour/raw/master/doc/assets/idetips.png)

### 2、http客户端配置项

#### showLoading
>设置请求开始前是否显示loading动画，为布尔值，默认值为：true

>与之对应的接口：
* enableLoading
* disableLoading

#### reqheader

>请求头对象，默认值为: 
```
{
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'mode': 'cors',
    'credentials': 'include'
}
```

>与之对应的接口：headers

#### onbefore
>设置请求开始时的回调函数，默认值：null

>与之对应的接口：before

#### onsuccess
>设置请求成功时的回调函数，默认值：null

>与之对应的接口是：success

#### onerror
>设置请求失败时的回调函数，默认值：null

>与之对应的接口是：error

#### oncomplete
>设置请求结束的回调函数，默认值：null

>与之对应的接口是：complete

#### useInterceptor
>是否启用拦截器，为布尔值，默认值：true

#### locked
>是否锁住配置好的客户端对象，为布尔值，默认值：false

>与之对应的接口是：lock

```
// 默认的请求头
export const defaultReqHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'mode': 'cors',
    'credentials': 'include'
};

// 默认的配置项
export const defaultOption = {
    showLoading: true,
    useInterceptor: true,
    locked: false,
    reqheader: {
        ...defaultReqHeader
    },
    onbefore: null,
    oncomplete: null,
    onsuccess: null,
    onerror: null
};
```

### 3、http协议支持的请求方法

#### get

#### post

#### head

#### put

#### patch

#### delete

### 4、钩子函数

#### before

#### success

#### error

#### complete

## 三、应用层封装公共的http客户端示例
