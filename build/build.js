#!/usr/bin/env node
const webpack = require('webpack');
const utils = require('./utils');
const logger = require("./logger");

// 解析命令行参数信息 => app表示要打包的应用名字; env表示环境(可选值为: dev|test|prod).
const cmdParams = utils.cmdArgv(process.argv.slice(2));
logger.blue('cmdParams', cmdParams);

// 设置环境
process.env.NODE_ENV = cmdParams.env;
logger.blue('set NODE_ENV', cmdParams.env);

// 获取要打包的app配置信息
const appInfo = utils.appInfo(cmdParams.app);
logger.blue('appInfo', appInfo);

// 获取webpack的编译配置
const compilerConfig = require(`./webpack.build.${cmdParams.env}.conf`).getConfig(appInfo);

// 打包应用
webpack(compilerConfig, (err, stats) => {
    if (err) {
        console.log(err.stack || err);
        if (err.details) {
            console.log(err.details);
        }
        return;
    }
    const info = stats.toJson();
    if (stats.hasErrors()) {
        console.log('errors', info.errors);
    }
    if (stats.hasWarnings()) {
        console.log('warnings', info.warnings);
    }
    if (!stats.hasErrors()) {
        logger.blue(`应用${appInfo.name}`, '构建成功');
    }
});