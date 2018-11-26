/**
 * 日志级别相关函数
 *
 * @author linmingdao
 */
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import { LEVELS, LEVEL_STRING, PADDING_LEVEL_STRING, STYLE, CONTEXT_FLAGS } from './constants';
import conf from './env/config';

/**
 * 字符串/数字转为日志级别数字.
 *
 * '1'会被转为1, 'DEBUG'会被转为0, 其他字符串一律转为0, 如果是数字, 则向下取整输出, 如果是其他类型, 则一律转为0.
 *
 * @param {any} value
 * @returns {number} 日志级别数字
 */
export function anything2Level(value) {
    if (isNumber(value)) {
        return Math.floor(value);
    }

    if (isString(value)) {
        let parsedValue = parseInt(value);

        if (!isNaN(parsedValue)) {
            return parsedValue;
        }

        let level = [
            LEVEL_STRING.DEBUG,
            LEVEL_STRING.INFO,
            LEVEL_STRING.WARN,
            LEVEL_STRING.ERROR,
            LEVEL_STRING.MUTE
        ].indexOf(value.toUpperCase());

        if (level < 0) {
            level = 0;
        }

        return level;
    }

    return 0;
}

/**
 * level转为字符串.
 *
 * @param {any} level 日志级别
 * @returns {string} 日志级别字符串
 */
export function anything2LevelString(level) {
    const nLevel = anything2Level(level);
    return [
        LEVEL_STRING.DEBUG,
        LEVEL_STRING.INFO,
        LEVEL_STRING.WARN,
        LEVEL_STRING.ERROR,
        LEVEL_STRING.MUTE
    ][nLevel] || `LEVEL(${level})`;
}

/**
 * 转化level字符串(为了显示整齐).
 *
 * @param {string} levelStr 日志级别字符串
 * @returns {string} 转化后的字符串
 */
export function paddingLevelString(levelStr) {
    return PADDING_LEVEL_STRING[levelStr] || '???';
}

/**
 * 定义样式
 *
 * @param {Object} colorfulStyles log样式
 * @param {Function} styles.level level字段样式
 * @param {Function} styles.module module字段样式
 * @param {Function} styles.time time字段样式
 * @param {Function} styles.content 日志内容样式(只对单行日志有效)
 */
export const colorfulStyles = {
    level(level) {
        const bg = STYLE.BG_COLOR[level] || STYLE.BG_COLOR.DEBUG
        return `border-radius:1px;color:#FFF;background:${bg};padding:0 5px;font-size:14px;`;
    },
    module(moduleName) {
        return `color:${STYLE.BG_COLOR.MODULE};font-size:${STYLE.FONT_SIZE};`;
    },
    time(now) {
        return `color:${STYLE.BG_COLOR.TIME};font-size:${STYLE.FONT_SIZE};`;
    },
    content(content) {
        return `color:${STYLE.BG_COLOR.CONTENT};font-size:${STYLE.FONT_SIZE};`;
    }
};

/**
 * 判断是否可以打印该级别的日志
 * @param {*} level 
 */
export const isAllowLevel = level => level >= LEVELS[conf['level']];

/**
 * 是否允许该模块打印日志
 * @param {*} moduleName 
 * @returns {Boolean} true: 允许打印, false: 不允许
 */
export const isAllowModule = moduleName => {
    moduleName = moduleName.trim().toLowerCase();
    const filter = conf['filter'];
    const convertedModuleName = moduleName.replace(/\//g, '.');

    // 查询本节点是否被屏蔽了
    if (filter.hasOwnProperty(convertedModuleName)) {
        return false;
    }
    // 查询父节点是否被屏蔽了
    else {
        const parentModules = moduleName.split('/');
        parentModules.pop();
        return _isAllowModule(parentModules, filter);
    }
};

function _isAllowModule(parentModules, filter) {
    let result = true;
    if (parentModules.length) {
        let pName = '';
        for (let i = 0; i < parentModules.length; i++) {
            pName += (i === 0 ? parentModules[i] : `.${parentModules[i]}`);
            if (filter.hasOwnProperty(pName)) {
                result = false;
                break;
            }
        }
    }
    return result;
}

/**
 * 是否以彩色形式输出日志
 */
export function isLogColorfully() {
    return conf['context-flags'].includes(CONTEXT_FLAGS.COLOR);
}

/**
 * 是否输出模块信息
 */
export function isLogModule() {
    return conf['context-flags'].includes(CONTEXT_FLAGS.MODULE);
}

/**
 * 是否输出日期信息
 */
export function isLogTime() {
    return conf['context-flags'].includes(CONTEXT_FLAGS.TIME);
}

/**
 * 是否输出级别信息
 */
export function isLogLevel() {
    return conf['context-flags'].includes(CONTEXT_FLAGS.LEVEL);
}