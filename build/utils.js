const fs = require('fs');
const path = require('path');

module.exports = {
    /**
     * 读取app的配置信息(build.json)
     * @param {String} appName 
     */
    appInfo(appName) {
        const appInfo = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../apps/${appName}/build.json`)));
        const devServerInfo = appInfo['devServer'] || {};
        appInfo['devServer'] && delete appInfo['devServer'];

        return {
            "entry": "index.js",
            "title": "index",
            "logo": "logo.png",
            "useDefaultTemplate": true,
            "devServer": {
                "host": "127.0.0.1",
                "port": 3002,
                ...devServerInfo
            },
            ...appInfo
        };
    },
    /**
     * 由app的配置信息获取相关的路径信息
     * @param {Object} appInfo: 应用的配置信息
     * @param {String} mode: 'package'表示是打包模式下的路径信息; 'devServer'表示是开发环境下的路径信息
     */
    pathInfo(appInfo, mode = 'package') {
        // 框架内核目录
        const core = path.resolve(__dirname, '../core');
        // 目标应用目录
        const app = path.resolve(__dirname, `../apps/${appInfo.name}`);
        // 模板路径
        const template = appInfo.useDefaultTemplate ? `${core}/template.html` : `${app}/template.html`;
        // 应用的打包根目录
        const dist = path.resolve(__dirname, `../${mode === 'devServer' ? '_dist' : 'dist'}`);
        // 具体应用的打包内存输出目录
        const app_dist = `${dist}/${appInfo.name}`;
        // 具体应用的libs目录
        const app_dist_libs = `${app_dist}/libs`;
        // 静态资源目录(这个路径主要是放置开发环境devServer依赖的库)
        const libs = path.resolve(__dirname, '../libs');

        return {
            core,
            app,
            template,
            dist,
            app_dist,
            app_dist_libs,
            libs
        };
    },
    /**
     * 解析命令行的参数信息
     * @param {Array} argv 
     */
    cmdArgv(argv = []) {
        const cmdParams = {};
        argv.forEach(item => {
            const args = item.split('=');
            cmdParams[args[0]] = args[1];
        });

        return cmdParams;
    },
    /**
     * 获取本地开发服务器(DevServer)的配置信息
     * @param {Object} appInfo 
     */
    devServerConf(appInfo) {
        return {
            clientLogLevel: 'info',
            contentBase: false, // 使用CopyWebpackPlugin插件，所以此处置为false
            host: appInfo.devServer.host,
            port: appInfo.devServer.port,
            hot: true,
            open: true,
            compress: true,
            overlay: true,
            // quiet: true,
            watchOptions: {
                poll: true
            },
            proxy: {
                [`${appInfo.devServer.host}:${appInfo.devServer.port}/*`]: {
                    target: appInfo.devServer.proxy,
                    changeOrigin: true,
                    secure: false
                }
            }
        };
    }
};