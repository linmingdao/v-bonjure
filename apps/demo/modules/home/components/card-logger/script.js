import Logger from '@vbonjour/Logger';

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
        }
    },
    methods: {
        testLogLevel(level) {
            sherrylevel(level);
            this.$set(this.loggerSettings, 'logLevel', level);
        },
        testLogSwitch(switchName, status) {
            this.$set(this.loggerSettings, switchName, status);
            contextFlags[switchName] = status;
            sherry(Object.keys(contextFlags).filter(name => contextFlags[name] === 'on'));
        },
        testModuleSwitch(moduleName, status) {
            moduleSwitch[moduleName] = status;
            const offModules = Object.keys(moduleSwitch).filter(name => moduleSwitch[name] === 'off').join(', ');
            this.$set(this.loggerSettings, 'offModules', offModules === '' ? '无' : offModules);
            if (status === 'on') {
                sherryon(moduleName);
            } else {
                sherryoff(moduleName);
            }
        },
        testLog(level) {
            const logger_Global = Logger.getLogger(); // 不指定模块名称会输出到'global'全局模块
            const logger_App_Main = Logger.getLogger('App/Main');
            const logger_App_Timeline = Logger.getLogger('App/Timeline');
            const logger_UIComponent = Logger.getLogger('UIComponents');
            const logger_UIComponent_Button = Logger.getLogger('UIComponents/Button');
            const logger_UIComponent_Select = Logger.getLogger('UIComponents/Select');
            const logger_UIComponent_GroupBox = Logger.getLogger('UIComponents/GroupBox');
            const logger_UIComponent_GroupBox_A = Logger.getLogger('UIComponents/GroupBox/A');
            const logger_UIComponent_GroupBox_A_B = Logger.getLogger('UIComponents/GroupBox/A/B');
            (function run() {
                var args = Array.prototype.slice.call(arguments);
                args.forEach(function(logger) {
                    logger[level]('这是一条日志哟: ', [1, 2, 3, 4], '消息对象: ', { j: 'j', k: 'k', h: { a: 'a', b: 'b' } });
                });
            }(
                logger_Global,
                logger_App_Main,
                logger_App_Timeline,
                logger_UIComponent,
                logger_UIComponent_Button,
                logger_UIComponent_Select,
                logger_UIComponent_GroupBox,
                logger_UIComponent_GroupBox_A,
                logger_UIComponent_GroupBox_A_B
            ));
        }
    }
};