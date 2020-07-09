规范会不断更新，目前只是针对魔镜项目的一个初始版本

## 一、前后端接口规范

### 1、约定：前后端的接口交互统一使用 RESTful 风格的 api

RESTful 入门推荐文章传送门：[理解 RESTful 架构](https://www.ruanyifeng.com/blog/2011/09/restful.html)，[RESTful API 最佳实践](http://www.ruanyifeng.com/blog/2018/10/restful-api-best-practices.html)

### 2、后端需要遵循 RESTful api 规范提供相关 api：

> url 只是标识了网络中的某个/类资源，所以 api 的定义只能出现名词

> 通过 http 动词来告知后端开发人员对 url 标识的资源的相应操作

### 3、约定可用的 http 动词 及其对应的资源 CRUD 动作

> POST：资源的 C 操作（create，新建资源），例如：

```
魔镜项目中前端提交一个用户配置的提数信息（提交的信息放在body中）：

POST api.mojing.com/v1/extraction
```

> GET：资源的 R 操作（retrieve，检索资源），例如：

```
魔镜项目中获取所有的提数信息：

GET api.mojing.com/v1/extractions → GET api.mojing.com/v1/extractions
```

```
魔镜项目中获取 id 为 347827 的提数信息：

GET api.mojing.com/v1/extractions/:id → GET api.mojing.com/v1/extractions/347827
```

> PUT：资源的 U 操作（update，更新资源），例如：

```
魔镜项目中更新 id 为 347827 的提数信息（更新的信息放在body中）：

PUT api.mojing.com/v1/extractions/:id → PUT api.mojing.com/v1/extractions/347827
```

```
说明：PUT 一般代表全量更新，PATCH 一般代表部分更新，但是由于真正实施起来较难精细到部分更新这一操作，所以约定：更新资源都是用 PUT 动词，前端会将资源的全量信息通过 http 请求携带给后端
```

> DELETE：资源的 D 操作（delete，删除资源），例如：

```
魔镜项目中删除 id 为 347827 的提数信息：

DELETE api.mojing.com/v1/extractions/:id → DELETE api.mojing.com/v1/extractions/347827
```

### 4、在 url 中嵌入版本编号 以 处理 api 升级引起的多个版本 api 的情况

常见的格式是：api 所在域名 + api 版本号 + 真正的 api

例如：

```
GET api.mojing.com/v1/extractions/:id -> GET api.mojing.com/v1/extractions/347827
```

表示魔镜项目中获取 id 为 347827 的提数信息

PS：api 的版本号到底是放在 url 中还是 header 中每个人会有不同的看法，这里就不讨论谁好谁坏了

### 5、以查询参数的形式规避多级 url，查询参数采用 全小写 + 下划线类型的参数形式

例如：

```
GET /authors/12/categories/2

转化成

GET /authors/12?categories=2
```

### 6、token 的处理规范

> 采用类似 OAuth2.0 的方式为 api 调用者提供登录认证。先通过登录接口获取 Access Token 后再通过该 token 调用需要身份认证的 API

> 跟 token 相关的响应头：

```js
{
    "access_token": "a8addb4f-60e0-4f3b-9230-b413c952fa76",
    "expires_in": 3600
}
```

客户端在获得 access token 的同时在响应中包含一个名为 expires_in 的数据，它表示当前获得的 token 会在多少 秒 后失效，这样做的好处是可以在前端校验 token 的有效性

> 跟 token 相关的请求头：

```js
{
    "authorization": "access_token=a8addb4f-60e0-4f3b-9230-b413c952fa76"
}
```

客户端在请求需要认证的 API 时，在请求头 Authorization 中带上 access_token

## 二、前后端数据格式规范

### 1、前后端数据交互统一使用 JSON 数据类型

### 2、response 的数据格式为：

```js
{
    // 业务的状态码
    code: 1001,
    // 业务的消息内容
    msg: '',
    // 该业务的数据字段
    data: {

    },
    // 业务的额外说明字段，用于辅助说明data的一些信息
    extra: {

    }
}
```

## 三、前后端状态码规范

### 1、前后端交互过程的响应数据不使用 http 协议的状态码，即 http 状态码只用于前后端开发者用户定位 http 请求的状态，不用与业务开发

### 2、前后端共享一套业务状态码，数据交互都通过这套状态码来进行

### 3、状态码避开 http 状态码，使用 4 位数字，数字 > 1000

例如：

```js
{
    // 以 1001 ~ 1999 之间的数字表示数据正常返回的情况
    1001：'登录成功',
    // 以 2001 ~ 2999 之间的数字表示数据异常返回的情况
    2001：'token过期，重新登录',
    2002：'登录失败，用户名错误',
    2003：'登录失败，密码错误'
}
```

这个状态码可以随着业务开发过程中制定形成，需要说明的是某个项目的状态码不一定适用于其他项目，毕竟状态码是很业务的
