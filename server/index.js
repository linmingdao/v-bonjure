const express = require('express');
// 引入json解析中间件
var bodyParser = require('body-parser');

var app = express();

// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.post('/login', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    console.log('user login request:');
    console.log(`username: ${username}`);
    console.log(`password: ${password}`);
    console.log(`=======================================`);
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

app.listen(3000, function() {
    console.log('server run at http://localhost:3000.');
});