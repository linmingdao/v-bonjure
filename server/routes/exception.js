module.exports = {
    install(app) {
        // 500错误测试 api
        app.get('/exception_500', (req, res) => {
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