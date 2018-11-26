/**
 * 日志框架测试页
 */
import Logger from 'logger';

// 日志级别控制
// sherrylevel('debug');
// sherrylevel('info');
// sherrylevel('warn');
// sherrylevel('error');
// sherrylevel('mute');

// 关闭模块的日志输出
// sherryoff('global');
// sherryoff('UIComponents');
// sherryoff('UIComponents/GroupBox');
// sherryoff('UIComponents/GroupBox/A');
// sherryoff('UIComponents/GroupBox/A/B');

// 打开模块的日志输出
// sherryon('global');
// sherryon('UIComponents');
// sherryon('UIComponents/GroupBox');
// sherryon('UIComponents/GroupBox/A');
// sherryon('UIComponents/GroupBox/A/B');

// 配置全局日志开关
// sherry(['color','level','module','time']);// 默认的
// sherry([]);
// sherry(['level','module','time']);
// sherry(['level','time']);
// sherry(['module','time']);

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