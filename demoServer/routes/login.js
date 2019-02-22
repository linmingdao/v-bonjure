const loginHandler = require('../handler/login');

module.exports = {
    install(app) {
        // 登录
        app.post('/login', (req, res) => {
            console.log('user login request:');
            res.cookie("VBONJOUR", '3DB7B8217880EB06C23DE2A868BB9C66', { maxAge: 900000, httpOnly: true });
            res.json(JSON.stringify(loginHandler.login({
                username: req.body.username,
                password: req.body.password
            })));
            res.end();
            console.log(`=======================================`);
        });

        // 查询token时候过期 api
        app.get('/token_expired', (req, res) => {
            console.log('query token is expired:');
            res.json(JSON.stringify(loginHandler.checkTokenIsExpired({
                token: req.headers.token
            })));
            res.end();
            console.log(`=======================================`);
        });
    }
}