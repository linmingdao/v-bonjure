消息类型，用于显示图标### 通知组件

#### 1.引用服务

```js
    import notificator from '@core/notificator';
```
通知组件采用服务方式提供，正确引用即可

#### 2.使用该组件

* type：消息类型，用于显示图标，默认 info
* message：信息, 默认 ''
* title：标题, 默认 ''
* dangerouslyUseHTMLString：自定义HTML开关，打开后直接解析message，默认 false
* showCancelButton：显示取消按钮, confirm 默认 true，其他 false
* confirmButtonText: 确认按钮文本，默认 确认
* cancelButtonText: 取消按钮文本，默认 取消
* closeOnClickModal: 点击遮罩关闭，默认 false
* callback: 回调函数，携带option
* height: 内容高度，默认自动扩展，设置高度将会取消自动扩展，高度不足显示滚动条
* width: 内容高度，默认自动扩展，设置宽度将会取消自动扩展，宽度不足显示滚动条
* showIcon: 是否显示ICON，默认 false
* spinner: loading样式 默认 el-icon-loading
* background：遮罩颜色与透明度，默认 rgba(0, 0, 0, 0.7)

#### 3.简单的栗子

```js
    notificator.alert('普通', {
        type: 'info',
        callback: option => {
            notificator.message('alert：' + option);
        }
    });
```
其余没有提到的部分，可以参考页面上的demo。




