#!/usr/bin/env node

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const CONSTANTS = require('./constants');
const utils = require('./utils');
const logger = require("./logger");

// 解析命令行参数信息 => 获取要运行的app名字
const cmdParams = utils.cmdArgv(process.argv.slice(2));
logger.blue('cmder params', cmdParams);

// 设置当前webpack构建模式为：本地开发模式
process.env.CURRENT_BUILD_MODE = CONSTANTS.BUILD_MODE.LOCAL_DEV;
logger.blue('set CURRENT_BUILD_MODE', CONSTANTS.BUILD_MODE.LOCAL_DEV);

// 获取要运行的app配置信息
const appInfo = utils.appInfo(cmdParams.app);
logger.blue('app info', appInfo);

// 获取webpack的编译配置
const compilerConfig = require('./webpack.local.dev.conf').getConfig(appInfo);
// 获取devServer的配置
const devServerConfig = utils.devServerConf(appInfo);

// 获取编译器
const compiler = webpack(compilerConfig);
// 创建DevServer对象并开启监听
var server = new WebpackDevServer(compiler, devServerConfig);
server.listen(appInfo.devServer.port);