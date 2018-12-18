const todoHander = require('../handler/todo');

module.exports = {
    install(app) {
        // 获取todolist列表
        app.get('/todolist/:userid', (req, res) => {
            console.log('request todolist:');
            res.json(JSON.stringify(todoHander.getTodolist({
                token: req.headers.token,
                userid: req.params.userid
            })));
            res.end();
            console.log(`=======================================`);
        });

        // 新增todo
        app.post('/todolist/:userid/todo', function(req, res) {
            console.log('request add todo:');
            res.json(JSON.stringify(todoHander.addTodo({
                token: req.headers.token,
                userid: req.params.userid,
                todo: req.body.todo
            })));
            res.end();
            console.log(`=======================================`);
        });

        // 删除todo
        app.delete('/todolist/:userid/todo/:todoid', function(req, res) {
            console.log('request delete todo:');
            res.json(JSON.stringify(todoHander.deleteTodo({
                token: req.headers.token,
                userid: req.params.userid,
                todoid: req.params.todoid
            })));
            res.end();
            console.log(`=======================================`);
        });

        // 更新todo
        app.patch('/todolist/:userid/todo/:todoid', function(req, res) {
            console.log('request update todo:');
            res.json(JSON.stringify(todoHander.updateTodo({
                token: req.headers.token,
                userid: req.params.userid,
                todoid: req.params.todoid,
                todo: req.body.todo
            })));
            res.end();
            console.log(`=======================================`);
        });
    }
};