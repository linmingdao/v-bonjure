## 组件间通信

### 一、基于事件总线形式的通信机制

Vue 本身直接提供了 “父->子(props)”、“子->父(emit)” 的组件通信模式，缺少针对兄弟组件间的通信模式，虽然兄弟组件间的通信可以借助 Vuex 实现，但是这种方式并不是最理想的，Vuex 尽量用于应用状态的存储，所以框架层实现了一套基于事件总线形式的组件间通信机制，参考了 “订阅\发布” 相关概念，方便组件从事件总线订阅与发布消息，事件总线的总体设计如下：

[组件间通信 visio 文件：communication.vsdx](https://github.com/linmingdao/v-bonjure/blob/doc/assets/communication.vsdx)

<p align="center"><img src="https://github.com/linmingdao/v-bonjure/blob/doc/assets/communication.png" border="1" alt="基于事件总线形式的通信机制"></p>

<font color=red size=4>\* 注意：框架启动应用的时候，就会给组件注入 “$subcribe” 和 “$publish” 方法，组件显示地调用了 “\$subcribe” 方法，才会将组件挂载到事件总线上（好处是可以降低事件总线的负载）。</font>

<font color=red size=4>\* 事件总线的底层实现方式充分考虑了大量组件 “订阅” 与 “发布” 的效率，达到了 “组件订阅消息” 与 “总线发布消息” 给对应的组件的算法复杂度皆是 O(1)，感兴趣可以阅读框架：“core/event” 模块相关源码。</font>

### 二、真实案例

![image](https://github.com/linmingdao/v-bonjure/blob/doc/assets/communication.gif)

上图是魔镜项目中从 提数配置列表 显示 名单列表 和 操作列表 的效果，“提数配置列表”、“名单列表” 和 “操作列表” 都是相互独立的兄弟组件，下面是这三个组件通过事件总线通信的代码示例如下：

- 提供 “提数配置列表”、“名单列表” 和 “操作列表” 这三个组件的包裹组件，该包裹组件通过 “\$subscribe” 从事件总线订阅了 “显示名单”、“显示操作记录列表”、“显示名单详情” 三个消息事件，并在 订阅的同时指定了接收消息事件的处理器，在这个处理器中分别针对不同的消息事件来处理不同弹窗的显示：

![image](https://github.com/linmingdao/v-bonjure/blob/doc/assets/subscribe.png)

- “提数配置列表” 组件（即 gif 中一开始显示的列表）中的 “操作” 栏目 组件中点击 “名单” 按钮的时候会向事件总线发布一条 “显示名单弹窗”，点击 “操作记录” 按钮的时候会向事件总线发布一条 “显示操作记录弹窗” 事件，事件总线统一接收组件发布的各种消息，并将消息转交给不同的组件，从而实现了组件间的消息通信

![image](https://github.com/linmingdao/v-bonjure/blob/doc/assets/publish.png)
