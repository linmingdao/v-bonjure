module.exports = (function(Promise) {
    if (!Promise.prototype.finally) {
        Promise.prototype.finally = function(callback) {
            return this.then(
                value => this.constructor.resolve(callback()).then(() => value),
                reason =>
                    this.constructor.resolve(callback()).then(() => {
                        throw reason;
                    })
            );
        };
    }
})(window.Promise);
