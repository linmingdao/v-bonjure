# 服务端文档

## 一、服务端状态码

* 1001，数据正常返回
* 1002，登录失败
* 1003，token过期

## 二、API

### 1、用户登录：/login

登录成功
```
{
    code: 1001,
    msg: '登录成功',
    extra: {},
    data: { token }
}
```

登录失败
```
{
    code: 1002,
    msg: '用户名或密码错误',
    extra: {},
    data: {},
}
```

### 2、获取待办列表：/todolist

token未过期，正常返回列表信息
```
{
    code: 1001,
    msg: 'token未过期,返回todolist',
    data: {
        todos: [
            { text: 'play games', done: true },
            { text: 'sing songs', done: false },
            { text: 'go shopping', done: true },
            { text: 'go to bed', done: false },
            { text: 'have midnight snack', done: false }
        ]
    },
    extra: {}
}
```

token过期
```
{
    code: 1003,
    msg: 'token过期,请重新登录',
    data: {},
    extra: {}
}
```


