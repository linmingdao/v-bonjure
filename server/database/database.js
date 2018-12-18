const uuid = require('uuid');

// 模拟数据库
let database = {};

function generateId() {
    return uuid.v4().replace(/-/g, '');
}

// 导出接口
module.exports = {
    /**
     * 初始化
     */
    init() {
        const userId = generateId();
        database = {
            'todolist': {
                [userId]: [{
                    id: generateId(),
                    text: 'play games',
                    done: true
                }, {
                    id: generateId(),
                    text: 'sing songs',
                    done: false
                }, {
                    id: generateId(),
                    text: 'go shopping',
                    done: true
                }, {
                    id: generateId(),
                    text: 'go to bed',
                    done: false
                }, {
                    id: generateId(),
                    text: 'have midnight snack',
                    done: false
                }]
            },
            'user': {
                'admin': {
                    id: userId,
                    password: '123456'
                }
            }
        };
        console.log('初始化数据库');
        console.log(`=======================================`);
    },
    /**
     * 获取用户信息
     * @param {String} username 
     */
    findUserByName(username) {
        return database['user'][username];
    },
    /**
     * 获取todolist
     */
    getTodolist(userid) {
        return database['todolist'][userid];
    },
    /**
     * 新增todo项
     * @param {String} text 
     */
    addTodo(userid, text = '') {
        database['todolist'][userid].push({
            id: generateId(),
            text,
            done: false
        });
    },
    /**
     * 删除todo项
     * @param {String} id 
     */
    deleteTodoById(userid, id) {
        database['todolist'][userid] = database['todolist'][userid].filter(todo => todo.id !== id);
    },
    /**
     * 更新todo项
     * @param {String} id 
     */
    updateTodoById(userid, id, todo) {
        database['todolist'][userid] = database['todolist'][userid].map(td => td.id === id ? todo : td);
    },
    /**
     * 查找todo项
     * @param {String} id 
     */
    findTodoById(userid, id) {
        return database['todolist'][userid].filter(todo => todo.id === id);
    }
};