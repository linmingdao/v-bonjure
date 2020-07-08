const Task = require('../task');
const webpack = require('webpack');

/**
 * 封装构建模式构建任务
 */
class BuildTask extends Task {
    /**
     * 个性化的配置延迟交由子类来实现：执行构建
     * @param {String} env
     * @param {String} analyzer
     * @param {Object} appInfo
     * @param {Object} pathInfo
     */
    execute({ env, analyzer, appInfo, pathInfo }) {
        process.env.BUILD_ENV = env;
        process.env.BUILD_MODE = 'appBundle';

        let envType = env;

        const envArr = env.split('_');
        if (envArr.length > 1) {
            envType = envArr[0];
        }

        // 获取webpack的编译配置
        const compilerConfig = require(`../config/webpack.${envType}.conf`).getConfig({
            env: envType,
            appInfo,
            pathInfo,
            analyzer
        });

        // 打包应用
        webpack(compilerConfig, (err, stats) => {
            if (err) {
                console.log(err.stack || err);
                if (err.details) {
                    console.log(err.details);
                }
                return;
            }
            if (!stats.hasErrors()) {
                console.log(`${env} 环境的应用 ${appInfo.name}`, '构建成功');
            }
        });
    }

    /**
     * 校验环境信息
     */
    validate({ envParams, existentAppNameList, availableEnvValueList, realAvailableEnv }) {
        const { env, app, analyzer } = envParams;

        if (typeof app === 'undefined') {
            return '请通过 app=??? 的形式指定应用名称';
        }

        if (typeof env === 'undefined') {
            return `请通过 env=[${availableEnvValueList.join('|')},${availableEnvValueList
                .map(item => item + '_xxx')
                .join(',')}] 的形式指定环境信息`;
        }

        // 校验应用名称
        if (!existentAppNameList.includes(app)) {
            return `不存在名称为${app}的应用`;
        }

        // 校验环境参数是否存在 build.json 配置中
        if (!realAvailableEnv.includes(env) || !availableEnvValueList.includes(env.split('_')[0])) {
            return `环境参数${env}不符合要求, 目前支持的环境参数为: ${availableEnvValueList.join(
                ','
            )},${availableEnvValueList.map(item => item + '_xxx').join(',')}`;
        }

        // 校验analyzer的值
        if (analyzer && !['enable', 'disable'].includes(analyzer)) {
            return `可用的analyzer的值应该是：enable | disable`;
        }

        return true;
    }

    /**
     * 准备问题列表
     */
    getQuestions() {
        const __this = this;
        const existentAppNameList = this.resolveExistentAppNameList();
        return [
            {
                type: 'list',
                name: 'app',
                message: 'choose app:',
                choices: existentAppNameList
            },
            {
                type: 'list',
                name: 'env',
                message: 'choose env:',
                choices: answers => {
                    const availableEnvValueList = __this.resolveAvailableEnvValueList(answers.app);
                    return availableEnvValueList;
                }
            },
            {
                type: 'list',
                name: 'analyzer',
                message: 'enable analyzer:',
                choices: ['disable', 'enable']
            }
        ];
    }
}

module.exports = BuildTask;
