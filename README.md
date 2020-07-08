<p align="center">
<a href="http://23.91.98.88/linq/v-base-core" target="_blank" rel="noopener noreferrer"><img width="292" height="65" src="https://github.com/linmingdao/v-bonjure/blob/doc/assets/logo.png" alt="v-base-core logo">
</a>
</p>
<h2 align="center">基于Vue的前端通用开发框架</h2>
<p align="center">
    <img src="http://23.91.98.88/linq/v-base-core/raw/master/doc/assets/platform.png" alt="Platform: macOS, windows, linux" />
    <a href="https://developer.apple.com/swift" target="_blank"><img src="http://23.91.98.88/linq/v-base-core/raw/master/doc/assets/language.png" alt="Language: JavaScript" /></a>
    <img src="http://23.91.98.88/linq/v-base-core/raw/master/doc/assets/license.png" alt="License: MIT" />
</p>

框架选择了当下流行的 [Vue](https://cn.vuejs.org/) + [Vuex](https://vuex.vuejs.org/) + [Vue Router](https://router.vuejs.org/) 的组合方案来快速搭建与迭代应用；为了快速搭建应用的视图层，框架集成了饿了么团队 [Element UI](http://element-cn.eleme.io/#/zh-CN) 框架；选择 [wepack 4.x](https://webpack.js.org/) 为应用的构建工具；提供了多应用并行开发的能力支持，框架为应用开发提供了如下通用能力：

-   可配置的网络通信模块（Http 协议）
-   Logger 日志模块
-   基于 [Element UI](http://element-cn.eleme.io/#/zh-CN) 二次封装的消息中心
-   应用启动器
-   应用不同环境编译打包服务
-   应用本地开发环境

## 零、框架还有待解决的问题列表

<p align="left">
<a href="http://23.91.98.88/linq/v-base-core/issues/9" target="_blank" rel="noopener noreferrer">问题列表</a>
</p>

## 一、进一步了解 v-bonjure 请阅读如下文章

<p align="left">
<a href="http://23.91.98.88/linq/v-base-core/issues/1" target="_blank" rel="noopener noreferrer">1、框架设计</a>
</p>
<p align="left">
<a href="http://23.91.98.88/linq/v-base-core/issues/2" target="_blank" rel="noopener noreferrer">2、框架概览(目录结构说明)</a>
</p>
<p align="left">
<a href="http://23.91.98.88/linq/v-base-core/issues/3" target="_blank" rel="noopener noreferrer">3、组件层级</a>
</p>
<p align="left">
<a href="http://23.91.98.88/linq/v-base-core/issues/4" target="_blank" rel="noopener noreferrer">4、应用开发</a>
</p>

## 二、环境搭建

1、安装 [Node](https://nodejs.org/en/)

> 下载并安装 [Node ( v10.14.2 LTS 版本 )](https://nodejs.org/dist/v10.14.2/node-v10.14.2-x64.msi)

    小贴士：为了今后本地机器可以运行不同版本的Node，你也可以选择安装nvm类型的工具来统一管理多版本Node

2、拉取框架至本地目录

> git clone ssh://git@23.91.98.88:49226/linq/v-base-core.git

3、在框架根目录打开命令行窗口，并执行如下命令安装相关依赖

> npm i

## 三、运行 demo app 以快速浏览框架提供的各种能力支持

在框架根目录新建两个命令行窗口，分别运行如下命令

1、运行 demo app 配套的后端服务

> npm run demo-server

    服务启动成功会监听本机9000端口

2、运行 demo app

> npm run dev app=demo

    npm run dev 命令表示以开发模式运行指定的app, 通过 app=your_app_name 指定要运行的应用名称

    应用会启动在本机3002端口

3、通过浏览器访问 demo app （推荐使用 Chrome 浏览器）

    http://127.0.0.1:3002

![image](http://23.91.98.88/linq/v-base-core/raw/master/doc/assets/app_login.png)

PS：可以通过浏览 demo app 目录下的源码 get “如何快速搭建你的应用” 这项神技哟

## 四、命令

在框架根目录下打开命令行窗口运行命令

1、运行开发环境命令

> npm run dev app=demo

2、运行打包命令

> npm run build app=your_app_name env=dev，开发环境打包命令

-   通过 app 指定要打包的应用
-   通过 env 指定打包的环境
-   env 可选值:
    -   dev: 开发环境
    -   test: 测试环境
    -   prod: 生产环境
-   比如 npm run build app=demo env=test 表示构建 demo 应用的测试环境包
