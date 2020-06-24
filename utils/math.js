import commonUtils from './common';

/**
 * 校验字符串是否符合数学表达式的格式
 * @param {String} string 表达式字符串
 * @param {Object} variables 表达式的变量名称
 */
const isExpression = (string, variables) => {
    /* eslint no-useless-escape: "off" */
    // 剔除空白符
    string = commonUtils.removeWhitespace(string);

    // 错误情况，空字符串
    if (commonUtils.isEmptyString(string)) {
        return {
            message: '输入的为空字符串',
            result: false
        };
    }

    // 错误情况，运算符连续
    if (/[\+\-\*\/]{2,}/.test(string)) {
        return {
            message: '输入错误，存在连续运算符',
            result: false
        };
    }

    // 空括号
    if (/\(\)/.test(string)) {
        return {
            message: '输入错误，存在空括号',
            result: false
        };
    }

    // 错误情况，括号不配对
    const stack = [];
    for (let i = 0, item; i < string.length; i++) {
        item = string.charAt(i);
        if (item === '(') {
            stack.push('(');
        } else if (item === ')') {
            if (stack.length > 0) {
                stack.pop();
            } else {
                return {
                    message: '输入错误，存在不配对的括号',
                    result: false
                };
            }
        }
    }
    if (stack.length !== 0) {
        return {
            message: '输入错误，存在不配对的括号',
            result: false
        };
    }

    // 错误情况，(后面是运算符
    if (/\([\+\-\*\/]/.test(string)) {
        return {
            message: '输入错误，(后面不允许直接跟运算符',
            result: false
        };
    }

    // 错误情况，)前面是运算符
    if (/[\+\-\*\/]\)/.test(string)) {
        return {
            message: '输入错误，)前面不允许存在运算符',
            result: false
        };
    }

    // 错误情况，(前面不是运算符
    if (/[^\+\-\*\/]\(/.test(string)) {
        return {
            message: '输入错误，(前面不是运算符',
            result: false
        };
    }

    // 错误情况，)后面不是运算符
    if (/\)[^\+\-\*\/]/.test(string)) {
        return {
            message: '输入错误，)后面不是运算符',
            result: false
        };
    }

    // 错误情况，以运算符结尾
    if (/[\+\-\*\/]$/.test(string)) {
        return {
            message: '输入错误，表达式不能以运算符结尾',
            result: false
        };
    }

    // 错误情况，存在未知变量
    const tmpStr = string.replace(/[\(\)\+\-\*\/]{1,}/g, '`');
    const array = tmpStr.split('`');
    for (let i = 0, item; i < array.length; i++) {
        item = array[i];
        // 不为空 && 非数字
        if (commonUtils.isNotEmptyString(item) && !/^[+-]?\d+(\.\d+)?$/.test(item)) {
            if (typeof variables[item] === 'undefined') {
                return {
                    message: `输入错误，存在未知变量：${item}`,
                    result: false
                };
            } else if (variables[item] !== 'number' && /[\(\)\+\-\*\/]{1,}/.test(string)) {
                return {
                    message: `输入错误，存在非数字类型参与数学运算：${item}`,
                    result: false
                };
            } else {
                /** 不做任何处理 */
            }
        }
    }

    return {
        message: '输入正确',
        expression: string,
        result: true
    };
};

/**
 * 提取表达式变量
 * @param {*} expression
 */
export function extractExpressionVariables(expression) {
    const variables = [];
    expression = commonUtils.removeWhitespace(expression);
    const tmpStr = expression.replace(/[\(\)\+\-\*\/]{1,}/g, '`');
    const array = tmpStr.split('`');
    for (let i = 0, item; i < array.length; i++) {
        item = array[i];
        // 不为空 && 非数字
        commonUtils.isNotEmptyString(item) && !/^[+-]?\d+(\.\d+)?$/.test(item) && variables.push(item);
    }
    return variables;
}

export default {
    isExpression,
    extractExpressionVariables
};
