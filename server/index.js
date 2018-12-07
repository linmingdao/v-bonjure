const express = require('express');
// 引入cookie中间件
const cookieParser = require("cookie-parser");
// 引入json解析中间件
var bodyParser = require('body-parser');
// 引入路由
var route = require('./route');

var app = express();

// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 安装路由
route.use(app);

// 使用cookie中间件
app.use(cookieParser());

app.listen(9000, function() {
    console.log('server run at http://localhost:9000.');
    console.log(`=======================================`);
});