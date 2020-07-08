const path = require('path');
const express = require('express');
const connectTimeout = require('connect-timeout');
const proxy = require('http-proxy-middleware');
const { port, timeout, includes } = require('./config');
// const history = require('connect-history-api-fallback');

const app = express();

// 设置端口
app.set('port', port);

// 设置超时 返回超时响应
app.use(connectTimeout(timeout));
app.use((req, res, next) => {
    if (!req.timedout) next();
});

// 支持 history API
// app.use(history());

// 静态资源路径
app.use(express.static(path.join(__dirname, './public')));

if (includes) {
    // 解析需要被代理的接口信息
    const hosts = Object.keys(includes);
    hosts.length &&
        hosts.forEach(host => {
            const apiList = includes[host];
            apiList.length && app.use(proxy(apiList, { target: host, changeOrigin: true }));
        });
}

// 启动代理服务器 并 监听端口
app.listen(app.get('port'), () => {
    console.log('==========================================');
    console.log(`proxy server running at ${app.get('port')}`);
    console.log('==========================================');
});
