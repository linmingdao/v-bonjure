const path = require('path');
const express = require('express');
// 引入cookie中间件
const cookieParser = require("cookie-parser");
// 引入json解析中间件
var bodyParser = require('body-parser');
// 引入路由
var router = require('./router');
// 导入模拟的数据库
const database = require('./database/database');

// 初始化数据库
database.init();

var app = express();

// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 使用express的静态文件中间件
app.use(express.static(path.join(__dirname, 'public')));

// 安装路由
router.use(app);

// 使用cookie中间件
app.use(cookieParser());

app.listen(9000, function() {
    console.log('server run at http://localhost:9000.');
    console.log(`=======================================`);
});