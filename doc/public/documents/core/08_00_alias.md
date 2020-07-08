## 服务别名

为了方便业务开发者引入框架提供的相关服务，框架在脚本层面提供了一套框架服务的别名机制：

```js
// 框架层提供的一些实用的工具类集合
import utils from '@utils';

// 提供了从应用根开始应用应用模块的别名
import xxx from '@app/xxx';

// 提供了框架层平台相关服务的别名
import xx_service from '@services/xx_service';

// 应用启动器别名
import utils from '@core/app';

// 框架层提供的http模块别名
import utils from '@core/http';

// 框架内核开发使用到的工具集
import utils from '@core/utils';

// 框架层提供的日志模块的别名
import utils from '@core/logger';

// 框架层提供的路由跳转模块别名
import utils from '@core/router';

// 框架层提供的日志命令行工具别名
import utils from '@core/loggerCmder';

// 框架层提供的消息中心构造器别名
import utils from '@core/notification';

// 框架层提供的消息中心单例别名
import utils from '@core/notificator';

// 框架层提供的顶级组件目录别名
import utils from '@components';

// v-base-component通用组件库别名
import utils from '@vBaseComponent';
```