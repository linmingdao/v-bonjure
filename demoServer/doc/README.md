# 服务端规范

## 1、统一服务端返回的数据格式并以json形式返回

这个约束太重要了，目的就不需要说明了

```
{
    code: 1001,
    msg: '登录成功',
    extra: {},
    data: {
        token: 'b94341bdaf614a1e81ae44a66524ec3d'
    }
}
```

字段说明：
* code：应用的状态码
* msg：状态码对应的消息
* data：请求对应的数据
* extra：一些额外需要告知客户端的数据，但是不是该请求的必要数据，只是起到补充说明的作用

## 2、服务端状态码说明

区别应用和http的状态码，应用的状态码是业务层面的，而http的状态码(比如404、500、400等等)是标识了请求的状态，所以不同层面的概念不要混用
应用状态码应用内部处理，http异常状态码框架层处理

* 1001，登录成功
* 1002，登录失败，msg会指定登录失败的原因，比如：“用户名或密码错误”
* ...

## 3、API，遵循 RESTful API 的标准

为何要使用 RESTful API ? 

### 1、url：统一资源定位符，是唯一标识某种资源，所以是名词性质的概念，所以url的定义也应该都是名词性质的，不要出现任何动词相关的词语

  错误的 url 示范:
  * /getAllCars
  * /createNewCar
  * /deleteAllRedCars

  符合 RESTful 规范的 url：
  * GET, /cars
  * POST, /car
  * DELETE, /car/:id

### 2、对资源的处理，是动词性质的概念，http提供的方法已经足够描述对该资源的动作了

  * GET：读取（Read）
  * POST：新建（Create）
  * PUT：更新（Update）
  * PATCH：更新（Update），通常是部分更新
  * DELETE：删除（Delete）
