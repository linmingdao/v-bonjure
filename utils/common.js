const uuidV4 = require('uuid').v4;

/**
 * 生成uuid
 */
const uuid = () => uuidV4().replace(/-/g, '');

/**
 * 去除字符串的空白字符
 * @param {*} obj
 * 所有的工具函数都会被混入到index.js文件
 */
const removeWhitespace = str => str.replace(/\s/g, '');

/**
 * 判断对象是否定义过
 * @param {*} obj
 */
const isNotUndefined = obj => typeof obj !== 'undefined';

/**
 * 判断对象是否定义过
 * @param {*} obj
 */
const isUndefined = obj => typeof obj === 'undefined';

/**
 * 判断是否是函数
 * @param {*} fn
 */
const isFunction = fn => typeof fn === 'function';

/**
 * 判断是否是数组
 * @param {*} obj
 */
const isArray = obj => isNotUndefined(obj) && Array.isArray(obj);

/**
 * 判断是否是非空数组
 * @param {*} obj
 */
const isNotEmptyArray = obj => isNotUndefined(obj) && Array.isArray(obj) && obj.length > 0;

/**
 * 判断是否是非空数组
 * @param {*} obj
 */
const isEmptyArray = obj => isNotUndefined(obj) && Array.isArray(obj) && obj.length === 0;

/**
 * 判断是否是对象
 * @param {*} obj
 */
const isObject = obj => isNotUndefined(obj) && Object.prototype.toString.call(obj) === '[object Object]';

/**
 * 判断是否是数值
 * @param {*} v
 */
const isNumber = v => typeof v === 'number';

/**
 * 判断是否是字符串
 * @param {*} obj
 */
const isString = obj => typeof obj === 'string';

/**
 * 判断是否是非空字符串
 * @param {*} obj
 */
const isNotEmptyString = obj => typeof obj === 'string' && obj.trim() !== '';

/**
 * 判断是否是非空字符串
 * @param {*} obj
 */
const isEmptyString = obj => typeof obj === 'string' && obj.trim() === '';

/**
 * 对象转数组
 * @param {Object} obj
 */
const convertObject2Array = function(obj) {
    const array = [];
    Object.keys(obj).forEach(function(key) {
        array.push(obj[key]);
    });
    return array;
};

/**
 * 数组去重
 * @param {*} arr
 * @param {*} key
 */
function uniqueArray(arr, key) {
    if (typeof key === 'undefined') {
        return Array.from(new Set(arr));
    } else {
        const obj = {};
        const tmp = [];
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if (!obj[element[key]]) {
                obj[element[key]] = 1;
                tmp.push(element);
            }
        }
        return tmp;
    }
}

/**
 * 获取指定的查询参数 不指定name就是返回所有的查询参数
 * 注意在前后端分离的场景需要兼容这两种url：
 * 普通的：http://127.0.0.1:3006/secondBrush?a=1&b=2
 * 带hash值的：http://127.0.0.1:3006/#/secondBrush?a=1&b=2
 * @param {*} name
 */
function getQueryString(name) {
    const href = window.location.href;
    const queryIdx = href.indexOf('?');
    if (queryIdx !== -1) {
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
        const allQueryString = href.substr(queryIdx + 1);
        if (typeof name !== 'undefined') {
            const r = allQueryString.match(reg);
            return r !== null ? unescape(r[2]) : '';
        } else {
            return allQueryString;
        }
    } else {
        return '';
    }
}

function getAllQueryObject() {
    const query = {};
    const queryStr = getQueryString();
    if (queryStr !== '') {
        const queryArr = queryStr.split('&');
        queryArr.forEach(item => {
            const itemArr = item.split('=');
            query[itemArr[0]] = itemArr[1];
        });
    }
    return query;
}

export default {
    uuid,
    removeWhitespace,
    isUndefined,
    isNotUndefined,
    isFunction,
    isArray,
    isNotEmptyArray,
    isEmptyArray,
    isObject,
    isNumber,
    isString,
    isNotEmptyString,
    isEmptyString,
    convertObject2Array,
    uniqueArray,
    getQueryString,
    getAllQueryObject
};
