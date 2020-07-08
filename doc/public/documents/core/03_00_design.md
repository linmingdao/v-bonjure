<p align="center">
<a href="http://23.91.98.88/linq/v-base-core" target="_blank" rel="noopener noreferrer"><img width="292" height="65" src="/documents/assets/logo.png" alt="v-base-core logo">
</a>
</p>
<h2 align="center">基于Vue的前端通用开发框架</h2>
<p align="center">
    <img src="/documents/assets/platform.png" alt="Platform: macOS, windows, linux" />
    <a href="https://developer.apple.com/swift" target="_blank"><img src="/documents/assets/language.png" alt="Language: JavaScript" /></a>
    <img src="/documents/assets/license.png" alt="License: MIT" />
</p>

框架选择了当下流行的 [Vue](https://cn.vuejs.org/) + [Vuex](https://vuex.vuejs.org/) + [Vue Router](https://router.vuejs.org/) 的组合方案来快速搭建与迭代应用；为了快速搭建应用的视图层，框架集成了饿了么团队 [Element UI](http://element-cn.eleme.io/#/zh-CN) 框架；选择 [wepack 4.x](https://webpack.js.org/) 为应用的构建工具；提供了多应用并行开发的能力支持，框架为应用开发提供了如下通用能力：

* 可配置的网络通信模块（Http协议）
* Logger日志模块
* 基于 [Element UI](http://element-cn.eleme.io/#/zh-CN) 二次封装的消息中心
* 应用启动器
* 应用不同环境编译打包服务
* 应用本地开发环境

## 框架、应用、后端 三者关系梳理

[框架设计visio文件：framework.vsdx](/documents/assets/framework.vsdx)

<p align="center"><img border="1" src="/documents/assets/framework.png" alt="框架、应用、后端 三者关系梳理"></p>

* 框架层主要为上层应用提供底层能力支持，框架层的设计不带任何业务性质，向上提供了如下可定制的服务：
  * 网络服务，当前版本只提供了Http协议的网络通信服务
  * 日志服务，统一应用的日志输出规范
  * 消息中心，为上层应用的消息提供统一的入口
  * 路由和状态管理，接管了应用的路由和状态
  * 应用启动器，启动应用
  * 以事件总线的形式提供了组件间通信的能力
  * 提供了代理服务（反向），方便前端应用的单独部署
  * 集成了与其他平台相关的服务，方便应用对接不同的平台
  * 支持多应用并行开发
  * 支持不同级别组件的开发与共享

* 应用层包含了如下几个概念：
  * 视图层，视图层不处理任何数据模型的转换，只负责视图的渲染与用户的交互
  * 业务层，负责接收网络层的数据，并对网络层的数据进行二次计算，将计算结果输送给视图层 或 存储在状态层
  * 状态层，负责存储应用的状态 并 响应式地更新视图层
  * 网络层，应用的最底层，该层不处理任何业务逻辑，只负责网络请求的发起与接收，并将请求结果上交业务层

* 后端服务，建议是提供 RESTful api 服务，但不强求

## 一、Http网络模块

Http模块的设计参考了 RESTful API 的相关概念，涵盖了 RESTful API 涉及到的大部分请求方法。框架层默认提供的Http客户端配置足以应对大部分业务场景，同时也提供了Http请求不同阶段的 “钩子函数”，应用开发者可以通过设置这些“钩子”来自定义一个Http客户端。

详细用法请阅读：《Http网络模块》

## 二、Logger日志模块

为了防止不同的开发人员日志输出五花八门，且不易统一管理，框架层提供了统一的日志输出模块，以管理开发者的应用日志

详细用法请阅读：《Logger日志模块》

## 三、Notification消息中心

框架层统一了UI框架为：Element UI，同时为了避免应用层弹窗调用方式各式各样，为此提供了应用消息弹窗的统一入口，同时也支持一些简单的配置

详细用法请阅读：《消息中心》

## 四、应用启动器

框架的设计是：单Vue实例，以下称为应用的 “根root”，应用的视图都以组件的形式挂载在根root上。

为何是单Vue实例?
   
    应用的状态树是只有一个根节点的，所以对应的的视图层也应该是一个根节点的，所以框架层给应用开发者提供了单Vue实例挂载应用，同时方便状态的管理与分发

详细用法请阅读：《应用启动器》

## 五、组件间通信

Vue本身直接提供了 “父->子(props)”、“子->父(emit)” 的组件通信模式，缺少针对兄弟组件间的通信模式，虽然兄弟组件间的通信可以借助Vuex实现，但是这种方式并不是最理想的，Vuex尽量用于应用状态的存储，所以框架层实现了一套基于事件总线形式的组件间通信机制，参考了 “订阅\发布” 相关概念，方便组件从事件总线订阅与发布消息。

## 六、代理服务(反向)

应用的开发过程难免会访问一些后端接口，开发环境通过配置devServer可以方便地代理后端接口，但是前端应用的独立发布则必须依赖于一个代理服务，这个代理服务接管了前端应用的请求，将应用的请求转向真实的后端接口

## 七、平台相关服务

前端应用会接入不同的平台，比如最常见的一种需求是前端应用要接入“协作平台”，那么框架就会实现一个服务用于“协作平台”的快速接入，比如应用内部打开一个新的协作平台tab，通知应用内部协作平台某个特定的tab被激活显示了等等