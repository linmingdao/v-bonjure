# Logger 日志模块
为了方便统一管理开发者的 console.xxx() 信息，框架提供了 Logger 日志模块

## 一、日志的级别
Logger 日志框架内置了5个日志级别，级别依次递增，级别越高输出的信息越少

* DEBUG
    
       输出调试信息，指出细粒度信息事件对调试应用程序是非常有帮助的

* INFO

       输出提示信息，消息在粗粒度级别上突出强调应用程序的运行过程

* WARN

       输出警告信息，表明会出现潜在错误的情形

* ERROR

       输出错误信息，指出发生的错误事件，可能会影响系统的继续运行

* MUTE

       级别最高，不输出任何日志信息

## 二、日志的模块、日期 与 调试数据信息
![image](https://github.com/linmingdao/v-bonjour/raw/master/doc/assets/logger.png)

## 三、日志的全局开关
为了方便框架、开发者设置日志的输出样式与输出内容，框架提供了全局的如下命令进行相关设置

* sherry命令：设置全局日志的输出样式与输出内容
  
  * sherry(['color', 'level', 'module', 'time'])，代表以 "color" 模式输出日志，日志内容包括：级别信息、模块信息、日期信息

     ![image](https://github.com/linmingdao/v-bonjour/raw/master/doc/assets/sherry_all.png)

  * sherry(['level', 'module', 'time'])，代表以 非"color" 模式输出日志，日志内容包括：级别信息、模块信息、日期信息

     ![image](https://github.com/linmingdao/v-bonjour/raw/master/doc/assets/sherry_no_color.png)

  * sherry(['color', 'level', 'module'])，代表以 "color" 模式输出日志，日志内容包括：级别信息、模块信息

     ![image](https://github.com/linmingdao/v-bonjour/raw/master/doc/assets/sherry_level_module.png)
  
  * sherry 命令剩下的组合可以自己在控制台直接调用 sherry 命令进行实验

* sherrylevel命令：设置全局日志输出的级别

  * sherrylevel('warn')，将全局日志级别设置为 'WARN'，那么将只会输出 级别 >= 'WARN' 的日志信息

  * 其余日志级别：debug、info、error、mute 可以自己在控制台直接调用 sherrylevel 命令进行实验

* sherryoff命令：关闭日志模块
    ```
    // 关闭 'UIComponents/GroupBox/A' 模块的日志输出
    // 那么 模块'UIComponents/GroupBox' 和 该模块子模块('UIComponents/GroupBox/*') 都将不再输出日志
    sherryoff('UIComponents/GroupBox');
    ```

* sherryon命令：打开日志模块
    ```
    sherryon('UIComponents/GroupBox')
    ```


## 四、在应用中输出日志信息

## 五、日志的输出规范化
