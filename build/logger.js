var colors = require('colors');

function message2String(message) {
    if (typeof message === 'object') {
        return JSON.stringify(message);
    } else if (typeof message === 'string') {
        return message;
    } else {
        return '暂时只支持字符串类型消息哦';
    }
}

function isNotEmptyString(str) {
    return typeof str === 'string' && str.trim() !== '';
}

class ColorfulLogger {
    constructor(title = '') {
        this.title = title;
    }

    decorateMessage(message) {
        const title = isNotEmptyString(this.title) ? `${this.title}: ` : '';
        return `${title}${message2String(message)}`;
    }

    log(message) {
        console.log(this.decorateMessage(message));
    }

    info(message) {
        console.log(this.decorateMessage(message).blue);
    }

    success(message) {
        console.log(this.decorateMessage(message).green);
    }

    warning(message) {
        console.log(this.decorateMessage(message).yellow);
    }

    error(message) {
        console.log(this.decorateMessage(message).red);
    }
}

module.exports = {
    title(title) {
        return new ColorfulLogger(title);
    },
    log(message) {
        new ColorfulLogger().log(message);
    },
    info(message) {
        new ColorfulLogger('INFO').info(message);
    },
    success(message) {
        new ColorfulLogger('SUCCESS').success(message);
    },
    warning(message) {
        new ColorfulLogger('WARNING').warning(message);
    },
    error(message) {
        new ColorfulLogger('ERROR').error(message);
    }
};
