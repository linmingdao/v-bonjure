const utils = require('../utils/utils');
const tokenUtils = require('../utils/tokenUtils');
const response = require('../utils/response');
const database = require('../database/database');
const STATUS_CODE = require('../constants/statusCode');

module.exports = {
    before(token, mocksleep = false) {
        // 模拟睡眠
        mocksleep && utils.mockSleep();
        // 检测token是否过期
        if (this.checkTokenIsExpired(token)) {
            console.log(`token: ${token} 过期`);
            return response.body(STATUS_CODE.TOKEN_EXPIRED, 'token过期,请重新登录');
        } else {
            console.log(`token: ${token} 未过期`);
            return null;
        }
    },
    checkTokenIsExpired(token) {
        return tokenUtils.isExpired(token);
    },
    getTodolist({ token, userid }) {
        const result = this.before(token, true);
        if (!result) {
            // token未过期，返回todolist
            return response.body(STATUS_CODE.REQUEST_OK, 'token未过期,返回todolist', { todos: database.getTodolist(userid) });
        } else {
            // token过期
            return result;
        }
    },
    addTodo({ token, userid, todo }) {
        const result = this.before(token);
        if (!result) {
            database.addTodo(userid, todo.text);
            console.log(`新增了todo: ${todo.text}`);
            return response.body(STATUS_CODE.REQUEST_OK, 'token未过期,返回todolist', { todos: database.getTodolist(userid) });
        } else {
            return result;
        }
    },
    deleteTodo({ token, userid, todoid }) {
        const result = this.before(token);
        if (!result) {
            database.deleteTodoById(userid, todoid);
            console.log(`删除了todo: ${todoid}`);
            return response.body(STATUS_CODE.REQUEST_OK, 'token未过期,返回todolist', { todos: database.getTodolist(userid) });
        } else {
            return result;
        }
    },
    updateTodo({ token, userid, todoid, todo }) {
        const result = this.before(token);
        if (!result) {
            database.updateTodoById(userid, todoid, todo);
            console.log(`更新了todo: ${todoid}`);
            return response.body(STATUS_CODE.REQUEST_OK, 'token未过期,返回todolist', { todos: database.getTodolist(userid) });
        } else {
            return result;
        }
    }
};