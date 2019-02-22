module.exports = {
    install(app) {
        // 500错误测试 api
        app.get('/exception_500', (req, res) => {
            throw new Error('抛出一个异常信息');
            res.json(JSON.stringify({
                code: 1003,
                msg: '500错误测试api',
                data: {},
                extra: {}
            }));
            res.end();
        });
    }
}