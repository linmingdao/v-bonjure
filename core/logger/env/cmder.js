/**
 * 全局命令行
 *
 * @author linmingdao
 */
import conf from './config';
import { LEVEL_STRING } from '../constants';

/**
 * 打开某个模块的日志
 * @param {String} moduleName 模块名
 */
export const loggerOn = moduleName => {
    // 打开所有模块日志
    if (moduleName.trim() === '**') {
        conf['filter'] = {};
    } else {
        // 打开某个模块日志
        moduleName = moduleName.trim().replace(/\//g, '.').toLowerCase();
        const filter = conf['filter'];
        filter.hasOwnProperty(moduleName) && delete filter[moduleName];
    }
};

/**
 * 屏蔽某个模块的日志打印
 * @param {String} moduleName 模块名
 */
export const loggerOff = moduleName => {
    moduleName = moduleName.trim().replace(/\//g, '.').toLowerCase();
    const filter = conf['filter'];
    !filter.hasOwnProperty(moduleName) && (filter[moduleName] = 'off');
};

/**
 * 设置日志级别
 * @param {String} level 日志级别
 */
export const loggerLevel = (level = LEVEL_STRING.DEBUG) => {
    level = level.trim().toUpperCase();
    LEVEL_STRING.hasOwnProperty(level) && (conf['level'] = LEVEL_STRING[level]);
};

/**
 * 设置日志的开关
 * @param {Array} flags 开关数组
 */
export const loggerConfig = flags => {
    if (flags && Array.isArray(flags)) {
        conf['context-flags'] = flags;
    }
};

/**
 * 获取日志的相关配置信息
 */
export const getLoggerConfig = () => conf;

let g = window;

// 为了方便在调试工具中直接开闭日志的相关功能，将日志的命令直接暴露到全局对象上
!g.loggerOn && (g.loggerOn = loggerOn);
!g.loggerOff && (g.loggerOff = loggerOff);
!g.loggerLevel && (g.loggerLevel = loggerLevel);
!g.loggerConfig && (g.loggerConfig = loggerConfig);
!g.getLoggerConfig && (g.getLoggerConfig = getLoggerConfig);