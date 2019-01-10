var colors = require("colors");

function message2String(message) {
    if (typeof message === 'object') {
        return JSON.stringify(message);
    } else if (typeof message === 'string') {
        return message;
    } else {
        return '暂时只支持字符串类型消息哦';
    }
}

module.exports = {
    log(title = '', message) {
        console.log(`${title}: ${message2String(message)}`);
    },
    green(title = '', message) {
        console.log(`${title}: ${message2String(message)}`.green);
    },
    red(title = '', message) {
        console.log(`${title}: ${message2String(message)}`.red);
    },
    yellow(title = '', message) {
        console.log(`${title}: ${message2String(message)}`.yellow);
    },
    blue(title = '', message) {
        console.log(`${title}: ${message2String(message)}`.blue);
    }
};