<p align="center">
<a href="https://github.com/linmingdao/v-bonjure/tree/master" target="_blank" rel="noopener noreferrer"><img width="292" height="65" src="https://github.com/linmingdao/v-bonjure/blob/doc/assets/logo.png" alt="v-base-core logo">
</a>
</p>
<h2 align="center">基于 Vue 的前端开发脚手架</h2>
<p align="center">
    <img src="https://github.com/linmingdao/v-bonjure/blob/doc/assets/platform.png" alt="Platform: macOS, windows, linux" />
    <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript" target="_blank"><img src="https://github.com/linmingdao/v-bonjure/blob/doc/assets/language.png" alt="Language: JavaScript" /></a>
    <img src="https://github.com/linmingdao/v-bonjure/blob/doc/assets/license.png" alt="License: MIT" />
</p>

框架选择了当下流行的 [Vue](https://cn.vuejs.org/) + [Vuex](https://vuex.vuejs.org/) + [Vue Router](https://router.vuejs.org/) 的组合方案来快速搭建与迭代应用；为了快速搭建应用的视图层，框架集成了饿了么团队 [Element UI](http://element-cn.eleme.io/#/zh-CN) 框架；选择 [wepack 4.x](https://webpack.js.org/) 为应用的构建工具；提供了多应用并行开发的能力支持，框架为应用开发提供了如下通用能力：

-   可配置的网络通信模块（Http 协议）
-   Logger 日志模块
-   基于 [Element UI](http://element-cn.eleme.io/#/zh-CN) 二次封装的消息中心
-   应用启动器
-   应用不同环境编译打包服务
-   应用本地开发环境

## 进一步了解脚手架的设计细节请移步

[v-bonjure 详细文档](https://cn.vuejs.org/)

## 环境搭建

1、安装 [Node](https://nodejs.org/en/)

> 下载并安装 [Node ( >= v10.14.2 LTS 版本 )](https://nodejs.org/dist/v10.14.2/node-v10.14.2-x64.msi)

小贴士：

> 为了今后本地机器可以方便地切换并运行不同版本的 Node，你也可以选择安装 [nvm](https://github.com/nvm-sh/nvm) 类型的工具来统一管理多版本 Node

2、拉取框架至本地目录

> git clone git@github.com:linmingdao/v-bonjure.git

3、在框架根目录打开命令行窗口，并执行如下命令安装相关依赖

> npm i

## 脚手架提供的内置命令行

在框架根目录下打开命令行窗口运行命令

1、初始化项目命令

> npm run init app=demo title=首页

<img src="https://github.com/linmingdao/v-bonjure/blob/doc/gifs/cmd_init.gif" alt="run init" />

2、运行开发环境命令

> npm run serve app=yourAppName env=dev

<img src="https://github.com/linmingdao/v-bonjure/blob/doc/gifs/cmd_serve.gif" alt="run serve" />

3、运行构建命令

> npm run build app=yourAppName env=dev analyzer=disable

<img src="https://github.com/linmingdao/v-bonjure/blob/doc/gifs/cmd_build.gif" alt="run build" />

-   通过 app 指定要打包的应用
-   通过 env 指定打包的环境
-   env 可选值:
    -   dev: 开发环境
    -   test: 测试环境
    -   prod: 生产环境
-   比如 npm run build app=demo env=test 表示构建 demo 应用的测试环境包

4、运行部署命令

> npm run deploy app=yourAppName env=dev

<img src="https://github.com/linmingdao/v-bonjure/blob/doc/gifs/cmd_deploy.gif" alt="run deploy" />

## 运行 demo app 以快速浏览框架提供的各种能力支持

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
