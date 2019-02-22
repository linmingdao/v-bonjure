const common = require('./routes/common');
const login = require('./routes/login');
const todo = require('./routes/todo');
const exception = require('./routes/exception');

module.exports = {
    use(app) {
        common.install(app);
        login.install(app);
        todo.install(app);
        exception.install(app);
    }
};