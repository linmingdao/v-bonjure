<h2 align="center">待实现的特性列表</h2>
<p align="center"><img width="496" height="288" src="https://github.com/linmingdao/v-bonjure/blob/doc/assets/todolist.jpg" alt="基于 fetch api 的网络通信模块"></p>

<font color=#a9a9a9>1. ~~webpack 设置 mode 为 production 后 vue 并没有以生产模式运行~~</font>

> 原因是采用了开发版本的 vue 库

<font color=#a9a9a9>2. ~~postcss 支持 px2rem 这一特性~~</font>

> 为了自适应的考虑，统一使用 rem 为单位，不使用 px，但是开发过程仍然用 px 为单位，px2rem 会自动将 px 转换为 rem，无需人为计算

<font color=#a9a9a9>3. ~~需要提供 npm run init 的命令行用来初始化一个新项目~~</font>

> 现在的做法是将框架根目录的 template 拷贝到 apps 目录下重命名成你的应用名称来手动初始化一个空项目

<font color=#a9a9a9>4. ~~需要提供 npm run deploy 应用部署命令来构建一个前端可以独立部署的包~~</font>

> 现在的做法是将 npm run build 生成的包拷贝到框架根目录的 proxy/public 静态资源目录下面，并且手动配置 proxy/config.js 以生成一个可以独立部署的前端应用

> 后期提供这个命令也需要考虑不同环境的配置

<font color=#a9a9a9>5. ~~引入 cssnext 语法来编写样式，做到样式的模块化管理~~</font>

<font>6. 构建命令需要对不同的环境支持更加细节的优化</font>

<font>7. windows 环境下 npm run dev 命令启动后 不能自动打开默认浏览器 以及 浏览器不支持热重载 的原因排查</font>

> 需要每次自己手动刷新不够智能，也降低了开发效率

<font>8. 考虑如何将协作平台的外框直接嵌入到前端通用开发框架中</font>

> 这样可以在开发阶段就能更好地做到与协作平台外框兼容性

<font color=#a9a9a9>9. ~~开发框架直接支持本地文档查看功能~~</font>

> npm run doc 命令会在本地运行文档系统，地址为：http://localhost:9000

> 在线文档系统地址：http://10.0.0.20:9000

<font>10. 请求的缓存机制，总是需要后端配合，所以在 Http 层面适当做掉一些请求的缓存</font>

<font color=#a9a9a9>11. ~~应用的 build.json 针对不同环境添加更加细化的配置信息~~</font>

<font>12. http 服务支持本地缓存特性</font>

> 目前已支持的缓存仅限与 http 缓存，但是启用 http 缓存要求后端接口有设置过期的响应头信息，遇到没有设置过期响应头又想缓存的请求则无能为力（除非你在应用内手动缓存）

> 可以利用 localStorage、sessionStorage 本地存储的 api 来实现 http 的缓存

<font>13. AOP(面向切面编程)的方式重构 http 服务的部分特性</font>

<font>14. npm run build 的速度优化</font>

<font color=#a9a9a9>15. ~~消息中心的消息弹窗改造，不再直接使用 Element ui 提供的弹窗样式~~</font>

<font color=#a9a9a9>16. ~~npm run serve 本地开发环境命令支持多代理的设置~~</font>

> 目前只支持单个代理服务器设置

<font color=#a9a9a9>17. ~~通用框架依赖与项目依赖各自的剥离~~</font>

<font>18. 自定义模板特性的实现</font>

<font>19. 排查某些位置的 css 修改后不被 watch 的原因</font>

<font>20. css 的资源引用（比如图片）支持别名</font>

<font>21. 最外层公共 utils 的整理</font>

<font>22. 解决构建过程的 ‘entrypoint size limit’ 和 ‘webpack performance recommendations’ 两个警告信息</font>
