# 框架设计

## 框架、应用、后端 关系梳理
![image](https://github.com/linmingdao/v-bonjour/raw/doc/doc/assets/framework.png)

## 一、Http网络模块

Http模块的设计参考了 RESTful API 的相关概念，涵盖了 RESTful API 涉及到的大部分请求方法。框架层默认提供的Http客户端配置足以应对大部分业务场景，同时也提供了Http请求不同阶段的 “钩子函数”，应用开发者可以通过设置这些“钩子”来自定义一个Http客户端

详细用法请阅读：
<p align="left">
<a href="https://github.com/linmingdao/v-bonjour/issues/1" target="_blank" rel="noopener noreferrer">Http网络模块用户指南</a>
</p>

## 二、Logger日志模块

详细用法请阅读：
<p align="left">
<a href="https://github.com/linmingdao/v-bonjour/issues/1" target="_blank" rel="noopener noreferrer">Logger模块用户指南</a>
</p>

## 三、消息中心

详细用法请阅读：
<p align="left">
<a href="https://github.com/linmingdao/v-bonjour/issues/1" target="_blank" rel="noopener noreferrer">Notification模块用户指南</a>
</p>

## 四、应用启动器

详细用法请阅读：
<p align="left">
<a href="https://github.com/linmingdao/v-bonjour/issues/1" target="_blank" rel="noopener noreferrer">应用启动器用户指南</a>
</p>