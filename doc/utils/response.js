module.exports = {
    body(code = '', msg = '', data = {}, extra = {}) {
        return { code, msg, data, extra };
    }
};