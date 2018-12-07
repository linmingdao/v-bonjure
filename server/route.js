const utils = require('./utils/utils');
const tokenUtils = require('./utils/tokenUtils');

module.exports = {
    use(app) {
        app.get('/*', function(req, res, next) {
            res.header('Content-Type', 'application/json');
            next();
        });

        app.get('/', (req, res) => {
            res.send('Hello World!');
            return;
        });

        // 登录api
        app.post('/login', (req, res) => {
            const username = req.body.username;
            const password = req.body.password;

            console.log('user login request:');
            console.log(`username: ${username}`);
            console.log(`password: ${password}`);
            console.log(`=======================================`);

            // 为了防止太快返回，前端交互看不到效果，这里模拟睡眠
            utils.mockSleep();

            if (username === 'admin' && password === '123456') {
                const token = tokenUtils.genToken();
                res.cookie("token", token, { maxAge: 900000, httpOnly: true });
                res.json(JSON.stringify({
                    code: 1001,
                    msg: '登录成功',
                    extra: {},
                    data: { token }
                }));
            } else {
                res.json(JSON.stringify({
                    code: 1002,
                    msg: '用户名或密码错误',
                    extra: {},
                    data: {},
                }));
            }
            res.end();
        });

        // 获取todolist列表 api
        app.get('/todolist', (req, res) => {
            const reqToken = req.headers.token;

            console.log('request todo-list:');

            // 模拟睡眠
            utils.mockSleep();

            if (!tokenUtils.isExpired(reqToken)) {
                console.log(`token: ${reqToken} 未过期`);
                res.json(JSON.stringify({
                    code: 1001,
                    msg: 'token未过期,返回todolist',
                    data: {
                        todos: [
                            { text: 'play games', done: true },
                            { text: 'sing songs', done: false },
                            { text: 'go shopping', done: true },
                            { text: 'go to bed', done: false },
                            { text: 'have midnight snack', done: false }
                        ]
                    },
                    extra: {}
                }));
            } else {
                console.log(`token: ${reqToken} 过期`);
                res.json(JSON.stringify({
                    code: 1002,
                    msg: 'token过期,请重新登录',
                    data: {},
                    extra: {}
                }));
            }
            res.end();
            console.log(`=======================================`);
        });
    }
};