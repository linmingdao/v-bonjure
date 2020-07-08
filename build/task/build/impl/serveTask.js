const Task = require('../task');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

/**
 * 私有方法：获取proxy的配置信息
 * @param {Object} appInfo
 */
function proxyConf(appInfo) {
    let proxy = {};
    switch (typeof appInfo.devServer.proxy) {
        case 'string':
            proxy[`${appInfo.devServer.host}:${appInfo.devServer.port}/*`] = {
                target: appInfo.devServer.proxy,
                changeOrigin: true,
                secure: false
            };
            break;
        case 'object':
            Object.keys(appInfo.devServer.proxy).forEach(k => {
                appInfo.devServer.proxy[k].forEach(p => {
                    proxy[`${appInfo.devServer.host}:${appInfo.devServer.port}${~p.indexOf('/') ? p : '/' + p}`] = {
                        changeOrigin: true,
                        secure: false,
                        target: k
                    };
                });
            });
            break;
    }

    return proxy;
}

/**
 * 私有方法：获取本地开发服务器(DevServer)的配置信息
 * @param {Object} appInfo
 */
function getDevServerConf(appInfo) {
    return {
        clientLogLevel: 'info',
        contentBase: false, // 使用CopyWebpackPlugin插件，所以此处置为false
        host: appInfo.devServer.host,
        port: appInfo.devServer.port,
        hot: true,
        open: true,
        compress: true,
        overlay: true,
        quiet: true,
        watchOptions: {
            poll: true
        },
        historyApiFallback: true,
        proxy: proxyConf(appInfo)
    };
}

/**
 * 封装开发模式构建任务
 */
class ServeTask extends Task {
    /**
     * 个性化的配置延迟交由子类来实现：执行构建
     * @param {*} env
     * @param {*} appInfo
     * @param {*} pathInfo
     */
    execute({ env, appInfo, pathInfo }) {
        process.env.BUILD_ENV = env;
        process.env.BUILD_MODE = 'devServer';

        // 获取webpack的编译配置
        const compilerConfig = require('../config/webpack.devServer.conf').getConfig({ appInfo, pathInfo });

        // 获取devServer的配置
        const devServerConfig = getDevServerConf(appInfo);

        // 获取编译器
        const compiler = webpack(compilerConfig);

        // 创建DevServer对象并开启监听
        var server = new WebpackDevServer(compiler, devServerConfig);
        server.listen(appInfo.devServer.port);
    }
}

module.exports = ServeTask;
