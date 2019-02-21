import Logger from '@core/Logger';
import { loggerOn, loggerOff, loggerLevel, loggerConfig } from '@core/LoggerCmder';

let contextFlags = {
    'color': 'on',
    'level': 'on',
    'module': 'on',
    'time': 'on'
};

let moduleSwitch = {
    'Global': 'on',
    'UIComponents': 'on',
    'UIComponents/GroupBox': 'on',
    'UIComponents/GroupBox/A': 'on',
    'UIComponents/GroupBox/A/B': 'on'
};

export default {
    data() {
        return {
            loggerSettings: {
                logLevel: 'debug',
                color: 'on',
                module: 'on',
                time: 'on',
                level: 'on',
                offModules: '无'
            }
        };
    },
    methods: {
        testLogLevel(level) {
            loggerLevel(level);
            this.$set(this.loggerSettings, 'logLevel', level);
        },
        testLogSwitch(switchName, status) {
            this.$set(this.loggerSettings, switchName, status);
            contextFlags[switchName] = status;
            loggerConfig(Object.keys(contextFlags).filter(name => contextFlags[name] === 'on'));
        },
        testModuleSwitch(moduleName, status) {
            moduleSwitch[moduleName] = status;
            const offModules = Object.keys(moduleSwitch).filter(name => moduleSwitch[name] === 'off').join(', ');
            this.$set(this.loggerSettings, 'offModules', offModules === '' ? '无' : offModules);
            if (status === 'on') {
                loggerOn(moduleName);
            } else {
                loggerOff(moduleName);
            }
        },
        testLog(level) {
            const loggerGlobal = Logger.getLogger(); // 不指定模块名称会输出到'global'全局模块
            const loggerAppMain = Logger.getLogger('App/Main');
            const loggerAppTimeline = Logger.getLogger('App/Timeline');
            const loggerUIComponent = Logger.getLogger('UIComponents');
            const loggerUIComponentButton = Logger.getLogger('UIComponents/Button');
            const loggerUIComponentSelect = Logger.getLogger('UIComponents/Select');
            const loggerUIComponentGroupBox = Logger.getLogger('UIComponents/GroupBox');
            const loggerUIComponentGroupBoxA = Logger.getLogger('UIComponents/GroupBox/A');
            const loggerUIComponentGroupBoxAB = Logger.getLogger('UIComponents/GroupBox/A/B');
            (function run() {
                let args = Array.prototype.slice.call(arguments);
                args.forEach(function(logger) {
                    logger[level]('这是一条日志哟: ', [1, 2, 3, 4], '消息对象: ', { j: 'j', k: 'k', h: { a: 'a', b: 'b' } });
                });
            }(
                loggerGlobal,
                loggerAppMain,
                loggerAppTimeline,
                loggerUIComponent,
                loggerUIComponentButton,
                loggerUIComponentSelect,
                loggerUIComponentGroupBox,
                loggerUIComponentGroupBoxA,
                loggerUIComponentGroupBoxAB
            ));
        }
    }
};