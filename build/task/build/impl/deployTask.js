const fs = require('fs');
const path = require('path');
const copydir = require('copy-dir');
const fileSys = require('file-system');
const Task = require('../task');

/**
 * 封装部署模式构建任务
 */
class DeployTask extends Task {
    /**
     * 个性化的配置延迟交由子类来实现：执行构建
     * @param {*} app
     * @param {*} env
     */
    execute({ app, env, appInfo }) {
        process.env.BUILD_ENV = env;
        process.env.BUILD_MODE = 'appBundle';

        this.logger.info(`run app=${app}, env=${env} deploy task...`);

        // 执行构建流程
        this.logger.info(`run app=${app}, env=${env} build task...`);
        this.execCommandSync(`npm run build app=${app} env=${env}`);

        // 清空目录
        const deployPath = path.join(process.cwd(), 'apps', app, 'deploy', env);
        if (fs.existsSync(deployPath)) {
            this.logger.info(`clean dir: ${deployPath}`);
            fileSys.rmdirSync(deployPath);
        }

        // 创建目录
        this.logger.info(`create dir: ${deployPath}`);
        fileSys.mkdirSync(deployPath);

        // copy proxy目录
        const templatePath = path.join(process.cwd(), 'proxy');
        this.logger.info(`copy template from:${templatePath} to:${deployPath}`);
        copydir.sync(templatePath, deployPath, {
            utimes: true,
            mode: true,
            cover: true
        });

        // 更新配置文件
        this.logger.info(`update config.`);
        const delopyConfigPath = path.join(process.cwd(), 'apps', app, 'deploy', env, 'config.js');
        const delopyConfig = require(delopyConfigPath);
        if (typeof appInfo.devServer.proxy === 'string') {
            delopyConfig.includes = {
                [appInfo.devServer.proxy]: ['**']
            };
        } else {
            delopyConfig.includes = appInfo.devServer.proxy;
        }
        delopyConfig.port = appInfo.devServer.port;
        fs.writeFileSync(delopyConfigPath, `module.exports = ${JSON.stringify(delopyConfig)}`);

        // copy 前端代码
        const distPath = path.join(process.cwd(), 'apps', app, 'dist', env);
        const publicPath = path.join(process.cwd(), 'apps', app, 'deploy', env, 'public');
        this.logger.info(`copy dist from: ${distPath} to ${publicPath}`);
        copydir.sync(distPath, publicPath, {
            utimes: true,
            mode: true,
            cover: true
        });

        // 自动安装相关依赖
        this.logger.info('installing dependencies...');
        this.execCommandSync(`cd ${deployPath}&&npm --registry https://registry.npm.taobao.org i`);
        this.logger.success('all done.');
    }
}

module.exports = DeployTask;
