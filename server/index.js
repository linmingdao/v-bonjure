const express = require('express');
// 引入json解析中间件
var bodyParser = require('body-parser');

var app = express();

// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

function fib(n) {
    if (n == 1 || n == 2) {
        return 1;
    }
    return fib(n - 1) + fib(n - 2);
}

const level = 42;


app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log('user login request:');
    console.log(`username: ${username}`);
    console.log(`password: ${password}`);
    console.log(`=======================================`);

    fib(level);

    if (username === 'admin' && password === '123456') {
        res.json(JSON.stringify({
            code: 1001,
            msg: 'login successful',
            extra: {},
            data: {
                token: '2h12-sa02wf2k-8s92-asdjOonp'
            }
        }));
    } else {
        res.json(JSON.stringify({
            code: 1002,
            msg: 'login failed',
            extra: {},
            data: {},
        }));
    }
});

app.post('/todolist', (req, res) => {
    const token = req.body.token;
    console.log('request todo-list:');
    console.log(`token: ${token}`);
    console.log(`=======================================`);

    fib(level);

    if (token === '2h12-sa02wf2k-8s92-asdjOonp') {
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
        res.json(JSON.stringify({
            code: 1002,
            msg: 'token过期,请重新登录',
            data: {},
            extra: {}
        }));
    }
});

app.listen(3000, function() {
    console.log('server run at http://localhost:3000.');
    console.log(`=======================================`);
});