<p align="center">
<a href="https://github.com/linmingdao/v-bonjour" target="_blank" rel="noopener noreferrer"><img width="292" height="65" src="https://github.com/linmingdao/v-bonjour/raw/master/doc/assets/logo.png" alt="v-bonjour logo">
</a>
</p>
<h2 align="center">基于Vue的前端通用开发框架</h2>

框架选择了当下流行的 [Vue](https://cn.vuejs.org/) + [Vuex](https://vuex.vuejs.org/) + [Vue Router](https://router.vuejs.org/) 的组合方案来快速搭建与迭代应用；为了快速搭建应用的视图层，框架集成了饿了么团队 [Element UI](http://element-cn.eleme.io/#/zh-CN) 框架；选择 [wepack 4.x](https://webpack.js.org/) 为应用的构建工具；提供了多应用并行开发的能力支持，框架为应用开发提供了如下通用能力：

* 可配置的网络通信模块（Http协议）
* Logger日志模块
* 基于 [Element UI](http://element-cn.eleme.io/#/zh-CN) 二次封装的消息中心
* 应用启动器
* 应用不同环境编译打包服务
* 应用本地开发环境

## 一、环境搭建

1、安装 [Node](https://nodejs.org/en/)
>下载并安装 [Node ( v10.14.2 LTS版本 )](https://nodejs.org/dist/v10.14.2/node-v10.14.2-x64.msi)

    小贴士：为了今后本地机器可以运行不同版本的Node，你也可以选择安装nvm类型的工具来统一管理多版本Node

2、拉取框架至本地目录
>git clone git@github.com:linmingdao/v-bonjour.git

3、在框架根目录打开命令行窗口，并执行如下命令安装相关依赖
>npm i

## 二、运行 demo app 以快速浏览框架提供的各种能力支持

在框架根目录新建两个命令行窗口，分别运行如下命令

>npm run server

    运行 demo app 配套的后端服务，服务启动成功会监听本机9000端口

>npm run dev

    会打开默认的浏览器运行 demo app，推荐将本机默认浏览设置为 Chrome

PS：如下三个命令分别对应不同环境的打包命令，关于如何快速搭建你的应用请阅读 [《demo app介绍以及快速搭建你的应用》](https://github.com/linmingdao/v-bonjour/raw/master/doc/demoapp.md)

>npm run build:dev，开发环境打包命令

>npm run build:test，测试环境打包命令

>npm run build:prod，生产环境打包命令

## 三、进一步了解 v-bonjour 请阅读如下文章

<p align="left">
<a href="https://github.com/linmingdao/v-bonjour/issues/1" target="_blank" rel="noopener noreferrer">1、框架设计</a>
</p>
<p align="left">
<a href="https://github.com/linmingdao/v-bonjour/issues/2" target="_blank" rel="noopener noreferrer">2、框架概览(目录结构说明)</a>
</p>
<p align="left">
<a href="https://github.com/linmingdao/v-bonjour/issues/3" target="_blank" rel="noopener noreferrer">3、组件层级</a>
</p>
<p align="left">
<a href="https://github.com/linmingdao/v-bonjour/issues/4" target="_blank" rel="noopener noreferrer">4、应用开发</a>
</p>
<p align="left">
<a href="https://github.com/linmingdao/v-bonjour/issues/5" target="_blank" rel="noopener noreferrer">5、推荐的开发方式与编码规范</a>
</p>