import dateFormat from 'dateformat';
// const uuidv4 = require('uuid/v4');

import { LEVEL_STRING, DATE_FORMATTER } from '../constants';
import { anything2LevelString, paddingLevelString, colorfulStyles, isAllowLevel, isAllowModule, isLogColorfully, isLogLevel, isLogTime, isLogModule } from '../helper';

/**
 * 日志上下文: 
 * 统一管理日志输出类并提供每个具体日志输出对象的运行上下文环境
 * 
 * @author linmigndao
 */
export default class LogContext {
    /**
     * Creates an instance of LogContext.
     *
     * @param {Object} styles [styles=colorfulStyles] log样式
     * @param {Function} styles.level level字段样式
     * @param {Function} styles.module module字段样式
     * @param {Function} styles.time time字段样式
     * @param {Function} styles.content 日志内容样式(只对单行日志有效)
     */
    constructor(styles = colorfulStyles) {
        // this.id = uuidv4();
        this.cstyles = styles;
    }

    /**
     * 通过level字符串获取log打印函数.
     *
     * @static
     * @param {any} levelStr 日志级别
     * @returns {Function} 日志打印函数
     */
    static getLogByLevel(levelStr, colorfully = true) {
        if (colorfully) {
            // 为了美观，统一使用log进行输出
            return console.log.bind(console);
        } else {
            switch (levelStr) {
                case LEVEL_STRING.DEBUG:
                    // debug不输出信息，debug使用info替代
                    // return console.debug.bind(console);
                    return console.info.bind(console);
                case LEVEL_STRING.INFO:
                    return console.info.bind(console);
                case LEVEL_STRING.WARN:
                    return console.warn.bind(console);
                case LEVEL_STRING.ERROR:
                    return console.error.bind(console);
                default:
                    return console.log.bind(console);
            }
        }
    }

    /**
     * 打印日志.
     *
     * @param {number|string} level 日志级别
     * @param {string} moduleName 模块名
     * @param {Array} params 其他参数
     */
    log(level, moduleName, params) {
        // 级别 与 模块名的控制
        const allowLevel = isAllowLevel(level);
        const allowModule = isAllowModule(moduleName);
        if (!allowLevel || !allowModule) return;

        if (isLogColorfully()) {
            // 彩色打印
            this.logColorfully(level, moduleName, params);
        } else {
            this.logMonochromatically(level, moduleName, params);
        }
    }

    /**
     * 彩色打印.
     *
     * @param {number|string} level 日志级别
     * @param {string} moduleName 模块名
     * @param {Array} params 其他参数
     */
    logColorfully(level, moduleName, params) {
        // 根据日志级别数字获取日志级别全称字符串
        const levelStr = anything2LevelString(level) || ('' + level);
        // 获取日志级别的简称字符串
        const paddingLevelStr = paddingLevelString(levelStr);
        // 获取当前时间
        const now = dateFormat(new Date(), DATE_FORMATTER);
        // 获取日志打印函数
        let log = LogContext.getLogByLevel(levelStr, true);

        // 收集日志内容
        const prefix = [];
        const styleParams = [];
        if (isLogLevel()) {
            prefix.push(`%c${paddingLevelStr}`);
            styleParams.push(this.cstyles.level(levelStr));
        }
        if (isLogModule()) {
            prefix.push(`%c${isLogLevel() ? ' ' : ''}🎁${moduleName} `);
            styleParams.push(this.cstyles.module(moduleName));
        }
        if (isLogTime()) {
            prefix.push(`%c📆${now} `);
            styleParams.push(this.cstyles.time(now));
        }
        prefix.push('%c💬');
        styleParams.push(this.cstyles.content());

        // 输出日志内容
        log(`${prefix.join('')}`, ...styleParams, ...params);
    }

    /**
     * 单色打印.
     *
     * @param {number|string} level 日志级别
     * @param {string} moduleName 模块名
     * @param {Array} params 其他参数
     */
    logMonochromatically(level, moduleName, params) {
        const levelStr = anything2LevelString(level) || ('' + level);
        const paddingLevelStr = paddingLevelString(levelStr);
        const now = dateFormat(new Date(), DATE_FORMATTER);
        const log = LogContext.getLogByLevel(levelStr, false);

        // 收集日志内容
        const prefix = [];
        if (isLogLevel()) {
            prefix.push(`[${paddingLevelStr}]-`);
        }
        if (isLogModule()) {
            prefix.push(`[${moduleName}]-`);
        }
        if (isLogTime()) {
            prefix.push(`[${now}]`);
        }

        // 输出日志内容
        log(prefix.join(''), ...params);
    }
}