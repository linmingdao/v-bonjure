# 日志模块

## 一、框架推荐的日志管理方式

### 1、禁止使用console.*()的方式自己打日志

* 请注意我使用了<font color=red size=5>“禁止”</font>二字；

* 原因：console.\*()的方式确实不会对程序的运行带来任何影响，但是却给框架的日志管理带来了影响，一旦业务开发者使用了console.\*()的方式，就代表着这部分日志脱离了框架层的管理；

* 坏处，举两个栗子：

  >打包程序对不同环境的日志处理是不同的，比如开发模式日志级别是DEBUG，意味着会输出所有日志，生产环境日志级别是ERROR，如果使用了console.\*()的方式，那么框架就没法过滤了；

  >其次不同开发人员可以通过日志开关控制日志级别和打开/关闭某些模块的日志，console.\*()的方式没法被控制而必定导致日志污染，会影响别的开发人员调试程序。

### 2、日志框架提供了如下几个级别的日志(级别依次递增)：

* DEBUG
  >输出调试信息: 指出细粒度信息事件对调试应用程序是非常有帮助的
* INFO
  >输出提示信息: 消息在粗粒度级别上突出强调应用程序的运行过程
* WARN
  >输出警告信息: 表明会出现潜在错误的情形
* ERROR
  >输出错误信息: 指出发生的错误事件，可能会影响系统的继续运行
* MUTE
  >最高级别，不输出任何日志信息

## 二、用法

```
// 不用关心模块的路径，在应用的任何地方都可以直接使用下面方式引入日志模块
import Logger from 'logger';


// 日志级别控制
loggerLevel('debug');
loggerLevel('info');
loggerLevel('warn');
loggerLevel('error');
loggerLevel('mute');

// 关闭模块的日志输出
loggerOff('global');
loggerOff('UIComponents');
loggerOff('UIComponents/GroupBox');
loggerOff('UIComponents/GroupBox/A');
loggerOff('UIComponents/GroupBox/A/B');

// 打开模块的日志输出
loggerOn('global');
loggerOn('UIComponents');
loggerOn('UIComponents/GroupBox');
loggerOn('UIComponents/GroupBox/A');
loggerOn('UIComponents/GroupBox/A/B');

// 配置全局日志开关
loggerConfig(['color','level','module','time']);// 默认的
loggerConfig([]);
loggerConfig(['level','module','time']);
loggerConfig(['level','time']);
loggerConfig(['module','time']);

// 日志框架测试
const logger_Global = new Logger(); // 不指定模块名称会输出到'global'全局模块
const logger_App_Main = new Logger('App/Main');
const logger_App_Timeline = new Logger('App/Timeline');
const logger_UIComponent = new Logger('UIComponents');
const logger_UIComponent_Button = new Logger('UIComponents/Button');
const logger_UIComponent_Select = new Logger('UIComponents/Select');
const logger_UIComponent_GroupBox = new Logger('UIComponents/GroupBox');
const logger_UIComponent_GroupBox_A = new Logger('UIComponents/GroupBox/A');
const logger_UIComponent_GroupBox_A_B = new Logger('UIComponents/GroupBox/A/B');

function run() {
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function(logger) {
        logger.debug('debug msg_1: ', [1, 2, 3, 4], 'debug msg_2: ', { j: 'j', k: 'k', h: { a: 'a', b: 'b' } });
        logger.info({ j: 'j', k: 'k', h: { a: 'a', b: 'b' } }, 'This is a info log.', 'This is a info log.', 'This is a info log.', { j: 'j', k: 'k', h: { a: 'a', b: 'b' } }, [1, 2, 3, 4]);
        logger.warn('This is a warning log.', 'This is a warning log.', 'This is a warning log.', { j: 'j', k: 'k', h: { a: 'a', b: 'b' } }, [1, 2, 3, 4]);
        logger.error('This is a error log.', 'This is a error log.', 'This is a error log.', { j: 'j', k: 'k', h: { a: 'a', b: 'b' } }, [1, 2, 3, 4]);
    });
}

// 执行测试
run(
    logger_Global,
    logger_App_Main,
    logger_App_Timeline,
    logger_UIComponent,
    logger_UIComponent_Button,
    logger_UIComponent_Select,
    logger_UIComponent_GroupBox,
    logger_UIComponent_GroupBox_A,
    logger_UIComponent_GroupBox_A_B
);
```

## 三、一些默认规则

### 1、日志的模块名命名规范：模块名首字母大写，采用驼峰法进行命名，子模块用 "/" 分割

* <font color=red size=5>Global/\*</font> 是框架层占用的模块名，应用层不要使用它
  >比如模块名 Global/Http 是框架层用于输出Http模块的相关日志，一旦应用层也使用了 Global/* ，那么排查应用日志和框架日志就不那么容易了，所以遵循规范，别自找麻烦

* <font color=red size=5>App/View/\*</font> 用于指定应用视图层的日志；
  >比如模块名 App/View/Login 表示登录模块视图层的日志

* <font color=red size=5>App/Store/\*</font> 用于指定应用状态层的日志；
  >比如模块名 App/Store/Login 表示登录模块状态层的日志

* <font color=red size=5>App/Net/\*</font> 用于指定应用网络层的日志；
  >比如模块名 App/Net/Login 表示登录模块网络层的日志

* <font color=red size=5>App/Handler/\*</font> 用于指定应用业务层的日志；
  >比如模块名 App/Handler/Login 表示登录模块业务层的日志