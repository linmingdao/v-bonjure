统一上层应用的各种消息弹窗

## 一、在应用中使用消息模块

### 1、导入依赖
```js
import notificator from '@core/notificator';
```

或者
```js
import Notification from '@core/Notification';
```
 * notificator：是框架提供的默认配置的消息弹窗实例对象，可以直接调用该对象上的方法进行弹窗显示消息
 * Notification：是框架提供的消息弹窗构造函数，你可以通过
    ```js
    const notificator = new Notification(); // 可以接受一个配置项对象
    ```
    或者
    ```js
    const notificator = Notification.getNotificator(); // 可以接受一个配置项对象
    ```
    的方式获取一个弹窗实例

### 2、弹窗显示消息
导入依赖之后，可以通过如下方式进行弹窗显示消息，其他弹窗方法请继续阅读剩下的文档内容
```js
import notificator from '@core/notificator';

// 弹窗一个确认框
notificator.messageWarning('这是消息内容');
```

![image](/documents/assets/alert.png)

## 二、消息模块的弹窗类型 以及 配置项

### 1、loading弹窗
![image](/documents/assets/loading.png)

### 2、alert弹窗
![image](/documents/assets/alert.png)

### 3、confirm弹窗
![image](/documents/assets/confirm.png)

### 4、message弹窗
![image](/documents/assets/message.png)
