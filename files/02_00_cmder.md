## 一、环境搭建

1、安装 [Node](https://nodejs.org/en/)

> 下载并安装 [Node ( > v10.14.2 LTS 版本 )](https://nodejs.org/zh-cn/)，注意请使用长期支持版本

    小贴士：为了今后本地机器可以运行不同版本的Node，你也可以选择安装nvm类型的工具来统一管理多版本Node

2、拉取框架至本地目录

-   由于公司禁用了 ssh 协议的 443 端口，所以 git 仓库的拉取不再使用 ssh 协议： ~~git clone ssh://git@23.91.98.88:49226/linq/v-base-core.git~~

-   请使用 http 协议进行拉取，为了方便后面提交代码不用每次输入用户名密码，可以在拉取的同时直接指定用户名和密码： git clone http://username:password@23.91.98.88/linq/v-base-core.git

3、在框架根目录打开命令行窗口，并执行如下命令安装相关依赖

> npm i

## 二、运行本地文档系统以快速浏览框架提供的各种能力支持

在框架根目录新建命令行窗口，运行如下命令

1、npm run doc 运行本地文档系统

> 服务启动成功会监听本机 9000 端口，运行前请先确认端口没有被其他应用占用

2、通过浏览器访问本地文档系统（推荐使用 Chrome 浏览器）

> http://127.0.0.1:9000

<img border="1" src="/documents/assets/doc_logo.png">

3、当然你也可以直接访问 [在线文档系统](http://10.0.0.20:9000)

## 三、命令

在框架根目录下打开命令行窗口运行命令

#### 1、介绍命令之前的一些参数说明

-   通过 app 指定要 运行|打包|部署 的应用名称
-   通过 env 指定要 运行|打包|部署 的环境，其可选值如下：
    -   dev: 开发环境
    -   test: 测试环境
    -   prep: 提审环境(预生产)
    -   prod: 生产环境

#### 2、创建项目命令

> npm run init app=[appName] port=[port] title=[title]

<img border="1" src="/documents/assets/init.gif" width="800">

#### 3、运行本地开发环境命令

> npm run serve app=[appName] env=[dev|test|prep|prod]

<img border="1" src="/documents/assets/serve.gif" width="800">

#### 4、运行打包命令

> npm run build app=[appName] env=[dev|test|prep|prod]

<img border="1" src="/documents/assets/build.gif" width="800">

#### 5、运行如下命令生成一个可以直接部署运行的包

> npm run deploy app=[appName] env=[dev|test|prep|prod]

<img border="1" src="/documents/assets/deploy.gif" width="800">
