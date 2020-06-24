import commonUtils from './common';

/**
 * 判断元素节点是否具有某个类名
 * @param {HTMLElement} ele
 * @param {String} className
 */
const hasClass = (function() {
    const div = document.createElement('div');
    if ('classList' in div && commonUtils.isFunction(div.classList.contains)) {
        return function(elem, className) {
            return elem.classList.contains(className);
        };
    } else {
        return function(elem, className) {
            const classes = elem.className.split(/\s+/);
            for (let i = 0; i < classes.length; i++) {
                if (classes[i] === className) {
                    return true;
                }
            }
            return false;
        };
    }
})();

/**
 * 添加类名
 * @param {HTMLElement} elements
 * @param {String} className
 */
const addClass = (function() {
    const div = document.createElement('div');
    if ('classList' in div && commonUtils.isFunction(div.classList.contains)) {
        return function(elements, className) {
            // 单个dom节点
            if (elements instanceof HTMLElement) {
                elements.classList.add(className);
            } else {
                if (elements.length) {
                    // 节点列表
                    Array.from(elements).forEach(function(el) {
                        el.classList.add('active');
                    });
                }
            }
        };
    }
    // else {
    //     return function(elem, className) {
    //         const classes = elem.className.split(/\s+/);
    //         for (let i = 0; i < classes.length; i++) {
    //             if (classes[i] === className) {
    //                 return true;
    //             }
    //         }
    //         return false;
    //     };
    // }
})();

/**
 * 移除类名
 * @param {HTMLElement} elements
 * @param {String} className
 */
const removeClass = (function() {
    const div = document.createElement('div');
    if ('classList' in div && commonUtils.isFunction(div.classList.contains)) {
        return function(elements, className) {
            // 单个dom节点
            if (elements instanceof HTMLElement) {
                elements.classList.remove(className);
            } else {
                if (elements.length) {
                    // 节点列表
                    Array.from(elements).forEach(function(el) {
                        el.classList.remove('active');
                    });
                }
            }
        };
    }
    // else {
    //     return function(elem, className) {
    //         const classes = elem.className.split(/\s+/);
    //         for (let i = 0; i < classes.length; i++) {
    //             if (classes[i] === className) {
    //                 return true;
    //             }
    //         }
    //         return false;
    //     };
    // }
})();

/**
 * js模拟jquery的closest实现
 * @param {*} el
 * @param {*} selector
 */
const closest = (el, selector) => {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            break;
        }
        el = el.parentElement;
    }
    return el;
};

/**
 * 防抖处理函数
 * @param func
 * @param wait
 * @param immediate
 */
const deBounce = (func, wait, immediate) => {
    let timeout, result;
    let deBounceDecorator = function() {
        const context = this;
        const args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            const callNow = !timeout;
            timeout = setTimeout(function() {
                timeout = null;
            }, wait);
            if (callNow) result = func.apply(context, args);
        } else {
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        }

        return result;
    };

    deBounceDecorator.cancel = function() {
        clearTimeout(deBounceDecorator);
        timeout = null;
    };

    return deBounceDecorator;
};

export default {
    hasClass,
    addClass,
    removeClass,
    closest,
    deBounce
};
