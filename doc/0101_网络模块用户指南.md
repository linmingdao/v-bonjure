# Http网络模块

Http模块的设计参考了 RESTful API 的相关概念，涵盖了 RESTful API 涉及到的大部分请求方法。框架层默认提供的Http客户端配置足以应对大部分业务场景，同时也提供了Http请求不同阶段的 “钩子函数”，应用开发者可以通过设置这些“钩子”来自定义一个Http请求客户端

## 一、在应用中使用 Http 模块

### 1、在应用的任何地方通过如下方式便可引入框架的 Http 服务
```
import Http from '@core/Http';
```

小贴士: 框架层提供的服务都可以通过 @core 打头的方式引入，应用开发者不用关心该服务实际的路径

![image](https://github.com/linmingdao/v-bonjour/raw/doc/doc/assets/@core.png)


### 2、以 demo app 用户登录为例讲解如何使用 Http 模块
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

### 3、获取并配置一个请求客户端需要这样分段书写代码显然是不人性化的，框架设计 Http 模块的时候充分考虑了代码书写的优雅与流畅性，提供了链式的方式来获取的同时配置你的http客户端
```
export async function login({ username, password }) {
    // 获取并配置一个http请求客户端，发起登录请求
    const response = await Http.getClient().headers({ 'token': localStorageHelper.get('token') }).disableLoading().post(API.LOGIN, { username, password });

    // 返回响应数据
    return response;
};
```

## 二、Http 模块功能特性

### 1、获取 http 客户端（ Http 构造器）

通过如下方式导入的 Http 实际上是一个构造器，用于构造一个http客户端对象
```
import Http from '@core/Http';
```

(1)、通过new关键字的方式构造一个http客户端
```
import Http from '@core/Http';

// new 的时候可以传入一个配置对象，不传会有默认的配置，想要了解配置对象请继续往下阅读
cont client = new Http();
```

很显然 new 的方式是不够人性化的，体现在如下两点：
* 用户需要翻阅理解构造http的各种配置项；
* 一旦你使用了 new 关键字就代表你开始针对具体编程，而不再是针对抽象编程，即 new 是高耦合的。

(2)、Http 提供了 getClient 静态方法用于获取一个采用默认配置的http客户端对象
```
import Http from '@core/Http';

// getClient同样可以接受一个配置对象，不传会采用默认的配置，但是你可以不必这样做，因为每个配置对象都有友好的接口进行链式地配置
cont client = Http.getClient();
```

该方式的优势是对象的创建过程对调用者是透明的，其次可以通过ide的智能提示一步一步地通过链式调用的方式配置一个符合用户需求的客户端对象

![image](https://github.com/linmingdao/v-bonjour/raw/master/doc/assets/idetips.png)

### 2、http 客户端配置项 与 对应的接口函数

#### showLoading
设置请求开始前是否显示loading动画，为布尔值，默认值为：true

与之对应的接口：
* enableLoading，启用请求开始时默认的loading动画
* disableLoading，启用请求开始时默认的loading动画
```
Http.getClient().enableLoading();

Http.getClient().disableLoading();
```

#### reqheader

请求头对象，默认值为: 
```
{
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'mode': 'cors',
    'credentials': 'include'
}
```

与之对应的接口：headers，设置请求头
```
Http.getClient().headers({
    // 你要设置的请求头
});
```

#### onbefore
设置请求开始时的回调函数，默认值：null

与之对应的接口：before
```
// client指向当前的请求客户端
Http.getClient().before(client => {
    // 发起请求之前做一些事儿
});
```

#### onsuccess
设置请求成功时的回调函数，默认值：null

与之对应的接口是：success
```
// 会将请求成功的响应结果塞给回调函数
Http.getClient().success(response => {
    // 请求成功之后做一些事儿
});
```

#### onerror
设置请求失败时的回调函数，默认值：null

与之对应的接口是：error
```
// 会将请求失败的异常信息塞给回调函数
Http.getClient().error(err => {
    // 请求失败做一些事儿
});
```

#### oncomplete
设置请求结束的回调函数，默认值：null

与之对应的接口是：complete
```
Http.getClient().complete(() => {
    // 请求结束做一些事儿
});
```

#### PS：钩子函数的执行顺序：

请求开始 -> onbefore -> 请求成功 -> onsuccess -> 请求结束 -> oncomplete

请求开始 -> onbefore -> 请求失败 -> onerror -> 请求结束 -> oncomplete

无论请求成功或失败都会调用 oncomplete，所以类似一些请求结束隐藏 loading 动画的操作应该放在 oncomplete 里面操作

#### useInterceptor
是否启用拦截器，为布尔值，默认值：true

#### intercept(设置拦截器接口)
```
// 拦截请求成功的响应结果
Http.getClient()intercept(response => {
    switch (response.code) {
        // token过期
        case STATUS_CODE.TOKEN_EXPIRED:
            logger.debug('token过期，请重新登录!');
            notificator.alertWarning(MESSAGE_TYPE.TOKEN_EXPIRED, {
                showClose: false,
                callback: action => {
                    action === NOTIFICATION_ACTION.CONFIRM && goto('/login');
                }
            });
            break;
        default:
            ;
    }
});
```

#### locked
是否锁住配置好的客户端对象，为布尔值，默认值：false

为什么会提供这个配置?

    应用层可能配置了一个公共的网络请求客户端，应用开发者大多数请求都会使用这个公共的客户端进行处理，
    但是难免会有一些特殊需求公共的请求客户端无法满足，由于支持链式调用，业务开发者可能直接二次配置
    公共请求客户端，这就会导致所有用到公共请求客户端的地方行为都被影响了，所以提供了locked配置的目
    的是，类似公共请求客户端这样配置不希望被开发人员随意修改的，配置完之后就将其设置为 locked

与之对应的接口是：lock
```
Http.getClient()
    .enableLoading()
    .before(() => { //... })
    .intercept(() => { //... })
    .lock();
```

#### 以上配置项的默认值为：
```
{
    showLoading: true,
    useInterceptor: true,
    locked: false,
    reqheader: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'mode': 'cors',
        'credentials': 'include'
    },
    onbefore: null,
    oncomplete: null,
    onsuccess: null,
    onerror: null
}
```

### 3、http协议支持的请求方法

#### get

#### post
post(api, data, headers)
```
Http.getClient().post(API.LOGIN, { username, password });
```

#### head
head(api)

#### put
put(api)

#### patch
patch(api)

#### delete
delete(api)

## 三、应用层封装公共的 http 客户端的一个示例
```
import Http from '@core/Http';
import Logger from '@core/Logger';
import { goto } from '@core/router';
import notificator from '@core/notificator';
import * as localStorageHelper from '../utils/localStorageHelper';
import { MESSAGE_TYPE, STATUS_CODE, NOTIFICATION_ACTION } from '../constants/index.js';

const logger = Logger.getLogger('App/Net');

/**
 * 1、框架层提供的http服务已经为业务开发者考虑到各种场景了，通常情况下默认配置的功能特性应该是够用的
 * 2、在框架提供的http默认功能配置不够用的情况下，应用可以在框架层特性之上定制一个的http请求客户端
 * 
 * 比如下面这个http客户端就是处理下面两个公共操作：
 * (1)、每次调用请求方法的时候会获取最新的token信息，方便后端做身份校验;
 * (2)、拦截token过期的响应结果，并提示用户重新登录;
 * 
 * PS：应用层只处理应用状态码，http的状态码框架层帮你处理掉了，当然如果你觉得不需要框架层帮你处理你也可以通过框架提供的http钩子函数自己处理
 */
const httpClient = Http.getClient()
    // 请求之前会先调用before设置的回调函数，http模块会把http客户端引用塞给before设置的回调函数
    .before(client => {
        // 由于可能存在用户频繁登出登录，所以token可能是时时改变的，所以在before的回调里面进行动态headers的设置
        // 不能使用client.headers()，因为已经被locked了
        client.reqheader.token = localStorageHelper.get('token');
    })
    // 设置请求头, 只会执行一次，可以设置一些静态的表头信息，如果有动态的表头，比如token，那么请在before回调里面进行设置
    // .headers({ 'token': localStorageHelper.get('token') })
    // 配置拦截器，拦截请求的响应结果
    .intercept(response => {
        switch (response.code) {
            // token过期
            case STATUS_CODE.TOKEN_EXPIRED:
                logger.debug('token过期，请重新登录!');
                notificator.alertWarning(MESSAGE_TYPE.TOKEN_EXPIRED, {
                    showClose: false,
                    callback: action => {
                        action === NOTIFICATION_ACTION.CONFIRM && goto('/login');
                    }
                });
                break;
            default:
                ;
        }
    })
    // 配置完之后上锁，该请求客户端不再是可配置的，目的是防止不同开发人员篡改公共的请求客户端配置
    .lock();

export default httpClient;
```
