/**
 * 日志级别相关函数
 *
 * @author linmingdao
 */
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import { LEVEL_STRING, PADDING_LEVEL_STRING } from './Constants';

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