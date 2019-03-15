/**
 * 防抖处理函数
 * @param func
 * @param wait
 * @param immediate
 */
export const deBounce = function(func, wait, immediate) {
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

/**
 * 数组去重合并
 * @param {*} list1 
 * @param {*} list2 
 * @param {*} uniqueField
 */
export const uniqueMerge = function(list1, list2, uniqueField) {
    // 剔除list2中与list1的重复数据
    const convertedList1 = list1.map(item => uniqueField(item));
    list2 = list2.filter(item => convertedList1.indexOf(uniqueField(item)) === -1);

    // 合并去重后的数组
    return [...list1, ...list2];
};