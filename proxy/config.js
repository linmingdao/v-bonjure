// 反向代理服务器配置信息
module.exports = {
    // 超时配置
    timeout: 60 * 1e3 * 6,
    // 代理服务器启动的端口
    port: 3900,
    // 配置需要被代理的接口信息
    includes: {
        // eg: 将 /mojing/* 代理到 http://10.0.0.20:8009/mojing/*
        'http://10.0.0.20:8009': ['/mojing/*'],
        // eg: 将 /users 代理到 http://127.0.0.1:9000
        'http://127.0.0.1:9000': ['/users']
    }
};
