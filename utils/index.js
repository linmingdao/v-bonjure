import dom from './dom';
import date from './date';
import math from './math';
import common from './common';
import * as localStorage from './localStorage';

/**
 * 所有的工具函数都会被混入到index.js文件
 */
export default {
    // 操作dom相关的工具函数
    ...dom,
    // 日期相关的工具函数
    ...date,
    // 与数学相关的工具函数
    ...math,
    // 一些通用的工具函数
    ...common,
    localStorage
};
