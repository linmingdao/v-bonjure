const fs = require('fs');
const path = require('path');
const logger = require('../logger');
const inquirer = require('inquirer');
const { exec, execSync } = require('child_process');

// 私有变量：可用的env值列表
const availableEnvValueList = ['dev', 'test', 'prep', 'prod'];

/**
 * 私有方法：解析命令行参数信息
 */
function resolveCmderParams() {
    const argv = process.argv.slice(2);
    const cmdParams = {};
    argv.forEach(item => {
        const args = item.split('=');
        cmdParams[args[0]] = args[1];
    });

    return cmdParams;
}

/**
 * 任务运行的上下文环境
 */
class Environment {
    constructor() {
        // 日志实例
        this.logger = logger;
        // 缓存项目信息
        this.appInfo = null;
        // 缓存路径信息
        this.pathInfo = null;
        // 缓存环境信息
        this.envParams = {};
        // 缓存项目列表信息
        this.existentAppNameList = null;
        // 缓存第三方组件库信息
        this.existentComponentsNameList = null;
    }

    /**
     * 设置环境信息
     * @param {*} params
     */
    setEnvParams(params) {
        this.envParams = params;
    }

    /**
     * 获取环境信息
     */
    getEnvParams() {
        return this.envParams;
    }

    /**
     * 执行系统命令-异步
     * @param {String} command
     * @param {Object} option
     * @param {Function} callback
     */
    execCommand(command, option = {}, callback = function() {}) {
        exec(command, option, callback);
    }

    /**
     * 执行系统命令-同步
     * @param {String} command
     * @param {Object} option
     */
    execCommandSync(command, option = {}) {
        execSync(command, option);
    }

    /**
     * 解析应用的配置信息(本质是解析build.json配置文件)
     */
    resolveAvailableEnvValueList(app){
        const appInfo = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'apps', app, 'build.json')));
        // 只读取指定环境的devServer配置
        const devServerInfo = appInfo['devServer'] || {};
        return Object.keys(devServerInfo); 
    }

    /**
     * 解析应用的配置信息(本质是解析build.json配置文件)
     */
    resolveAppInfo() {
        if (!this.appInfo) {
            const { app, env } = this.getEnvParams();
            if (app && env) {
                // I\O读取build.json配置文件
                const appInfo = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'apps', app, 'build.json')));

                // 只读取指定环境的devServer配置
                const devServerInfo = appInfo['devServer'][env] || {};
                appInfo['devServer'] && delete appInfo['devServer'];

                // 缓存解析结果
                this.appInfo = {
                    entry: 'index.js',
                    title: 'index',
                    logo: 'logo.png',
                    devServer: {
                        host: '127.0.0.1',
                        port: 3002,
                        ...devServerInfo
                    },
                    ...appInfo
                };
            } else {
                this.appInfo = {};
            }
        }

        return this.appInfo;
    }

    /**
     * 解析出当前已经存在的应用列表信息
     */
    resolveExistentAppNameList() {
        if (!this.existentAppNameList) {
            // 解析所有应用
            const appsPath = path.resolve(process.cwd(), 'apps');
            let appNameList = [];
            fs.readdirSync(appsPath).forEach(file => {
                const fileStat = fs.statSync(path.resolve(appsPath, file));
                fileStat.isDirectory() &&
                    appNameList.push({
                        name: file,
                        updateTime: fileStat.mtimeMs
                    });
            });

            // 排序
            appNameList = appNameList.sort((a, b) => b['updateTime'] - a['updateTime']);

            // 缓存解析结果
            this.existentAppNameList = appNameList.map(item => item.name);
        }

        return this.existentAppNameList;
    }

    /**
     * 解析出当前已经存在的公共组件库列表信息
     */
    resolveExistentComponentsNameList() {
        if (!this.existentComponentsNameList) {
            // 解析所有组件列表
            const componentsRoot = path.resolve(process.cwd(), 'components');
            let componentsNameList = [];
            fs.readdirSync(componentsRoot).forEach(file => {
                const fileStat = fs.statSync(path.resolve(componentsRoot, file));
                fileStat.isDirectory() &&
                    componentsNameList.push({
                        name: file,
                        updateTime: fileStat.mtimeMs
                    });
            });

            // 排序
            componentsNameList = componentsNameList.sort((a, b) => b['updateTime'] - a['updateTime']);

            // 缓存解析结果
            this.existentComponentsNameList = componentsNameList.map(item => item.name);
        }

        return this.existentComponentsNameList;
    }

    /**
     * 由app的配置信息获取相关的路径信息
     */
    resolvePathInfo() {
        if (!this.pathInfo) {
            const envParams = this.getEnvParams();
            if (envParams.app && envParams.env) {
                let envType = envParams.env;
                const envArr = envType.split('_');
                if(envArr.length>1){
                    envType=envArr[0];
                }

                const cwd = process.cwd();
                // 框架内核目录
                const core = path.resolve(cwd, 'core');
                // 目标应用根目录
                const app = path.resolve(cwd, 'apps', envParams.app);
                // 目标应用源码目录
                const app_src = path.resolve(app, 'src');
                // 模板路径
                const template = path.resolve(app, 'template.html');
                // 具体应用的打包输出目录
                const app_dist = path.resolve(app, 'dist', envParams.env);
                // 具体应用的libs目录
                const app_dist_libs = path.resolve(app_dist, 'libs');
                // 项目自己的libs
                const app_libs = path.resolve(app, 'libs');
                // 静态资源目录(这个路径主要是放置开发环境devServer依赖的库)
                const libs = path.resolve(cwd, 'libs', envType === 'prod' ? 'prod' : 'dev');

                // 缓存解析结果
                this.pathInfo = {
                    core,
                    app,
                    template,
                    app_src,
                    app_libs,
                    app_dist,
                    app_dist_libs,
                    libs
                };
            } else {
                this.pathInfo = {};
            }
        }

        return this.pathInfo;
    }

    /**
     * 准备任务运行的环境上下文
     */
    prepareEnvironment() {
        return new Promise((resolve, reject) => {
            const cmdParams = resolveCmderParams();
            if (Object.keys(cmdParams).length) {
                // 以命令行模式设置环境参数
                this.validateEnvParams(cmdParams, resolve, reject);
            } else {
                // 获取子类设置的问题列表
                const questions = this.getQuestions({
                    availableEnvValueList,
                    existentAppNameList: this.resolveExistentAppNameList()
                });
                // 以交互模式设置环境参数
                inquirer.prompt(questions).then(answers => {
                    this.validateEnvParams(answers, resolve, reject);
                });
            }
        });
    }

    /**
     * 执行校验环境信息
     * @param {*} envParams
     */
    validateEnvParams(envParams, resolve, reject) {
        const existentAppNameList = this.resolveExistentAppNameList();
        const realAvailableEnv = existentAppNameList.includes(envParams.app) ? this.resolveAvailableEnvValueList(envParams.app) : availableEnvValueList;
        const existentComponentsNameList = this.resolveExistentComponentsNameList();

        const result = this.validate({
            envParams,
            realAvailableEnv,
            existentAppNameList,
            existentComponentsNameList,
            availableEnvValueList,
        });
        if (typeof result === 'boolean' && result) {
            this.setEnvParams(envParams);
            resolve({
                appInfo: this.resolveAppInfo(),
                pathInfo: this.resolvePathInfo(),
                existentAppNameList,
                existentComponentsNameList,
                availableEnvValueList: realAvailableEnv,
                ...envParams
            });
        } else {
            reject(result);
        }
    }

    /**
     * 运行任务
     */
    run() {
        // 准备环境变量
        this.prepareEnvironment().then(envParams => {
            // 调用之类实现的构建流程
            this.execute(envParams);
        });
    }
}

module.exports = Environment;
