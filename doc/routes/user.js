const userHander = require('../handler/user');

module.exports = {
    install(app) {
        // 获取user列表
        app.get('/users', (req, res) => {
            console.log('request userList:');
            const queryObj = req.query;
            console.log('query object')
            console.log(queryObj);
            const pageSize = parseInt(queryObj['pageSize']);
            const pageNumber = parseInt(queryObj['pageNumber']);
            res.json(JSON.stringify(userHander.getUserList({
                token: req.headers.token,
                ...queryObj,
                pageSize,
                pageNumber
            })));
            res.end();
            console.log(`=======================================`);
        });

        // 新增user
        app.post('/user', function(req, res) {
            console.log('request add user:');
            res.json(JSON.stringify(userHander.addUser({
                token: req.headers.token,
                userInfo: req.body.userInfo
            })));
            res.end();
            console.log(`=======================================`);
        });

        // 批量删除user
        app.delete('/users', function(req, res) {
            console.log('request delete user:');
            console.log(req.body);
            res.json(JSON.stringify(userHander.deleteUserInBulk({
                token: req.headers.token,
                userIdList: req.body.userIdList
            })));
            res.end();
            console.log(`=======================================`);
        });

        // 删除user
        app.delete('/user/:userid', function(req, res) {
            console.log('request delete user:');
            res.json(JSON.stringify(userHander.deleteUser({
                token: req.headers.token,
                userId: req.params.userid
            })));
            res.end();
            console.log(`=======================================`);
        });

        // 更新user
        app.patch('/user/:userid', function(req, res) {
            console.log('request update user:');
            res.json(JSON.stringify(userHander.updateUser({
                token: req.headers.token,
                userId: req.params.userid,
                userInfo: req.body.userInfo
            })));
            res.end();
            console.log(`=======================================`);
        });
    }
};