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

[v-bonjure 详细文档](https://github.com/linmingdao/v-bonjure/blob/doc/files/index.html)

## 环境搭建

### 1、安装 [Node](https://nodejs.org/en/)

小贴士：

> 为了今后本地机器可以方便地切换并运行不同版本的 Node，你也可以选择安装 [nvm](https://github.com/nvm-sh/nvm) 类型的工具来统一管理多版本 Node

### 2、拉取框架至本地目录

> git clone git@github.com:linmingdao/v-bonjure.git

### 3、在框架根目录打开命令行窗口，并执行如下命令安装相关依赖

> npm i

## 脚手架提供的内置命令行

在框架根目录下打开命令行窗口运行命令，每个命令都支持直接输入完整的带参数信息的命令，也支持通过输入不带参数的命令，进而交互式地选择命令参数

### 1、参数解释

-   通过 app 指定要执行操作的应用
-   通过 env 指定执行该命令的环境
-   默认的 env 可选值，当然你可以通过编辑每个应用目录下面的 build.json 配置文件以 新增 or 修改 配置信息:
    -   dev: 开发环境
    -   test: 测试环境
    -   prep: 预生产环境
    -   prod: 生产环境
-   比如 npm run build app=demo env=test 表示构建 demo 应用的测试环境包

### 2、初始化项目命令

带参数的完整命令：

> npm run init app=[项目名] title=[首页的 title 信息]

交互式选择参数：

<img src="https://github.com/linmingdao/v-bonjure/blob/doc/gifs/cmd_init.gif" alt="run init" />

### 3、运行开发环境命令

带参数的完整命令：

> npm run serve app=[项目名] env=[环境信息]

交互式选择参数：

<img src="https://github.com/linmingdao/v-bonjure/blob/doc/gifs/cmd_serve.gif" alt="run serve" />

该命令会在 apps 目录下创建一个新的应用

### 4、运行构建命令

带参数的完整命令：

> npm run build app=[项目名] env=[环境信息] analyzer=[disable|enable]

交互式选择参数：

<img src="https://github.com/linmingdao/v-bonjure/blob/doc/gifs/cmd_build.gif" alt="run build" />

该命令会在该应用的 dist 目录下生成对应环境的构建包

### 5、运行部署命令

带参数的完整命令：

> npm run deploy app=[项目名] env=[环境信息]

交互式选择参数：

<img src="https://github.com/linmingdao/v-bonjure/blob/doc/gifs/cmd_deploy.gif" alt="run deploy" />

该命令会在该应用的 deploy 目录下生成对应环境的可直接运行的部署包，在构建好的部署包目录下直接通过 node 运行 app.js 即可查看运行效果

### 6、运行格式化代码的相关命令

格式化框架代码：

> npm run format

格式化框架代码：

> npm run format:global

格式化 apps 目录下单个项目代码：

> npm run format:app app=[项目名]

格式化指定的目录或者文件：

> npm run format:dir dir=[目录或者文件]

### 7、运行本地文档命令

运行本地文档：

> npm run doc

该命令会在本机的 9000 端口运行脚手架自带的文档系统

<img src="https://github.com/linmingdao/v-bonjure/blob/doc/gifs/cmd_doc.gif" alt="run doc" />
