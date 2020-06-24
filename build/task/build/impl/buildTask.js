const Task = require('../task');
const webpack = require('webpack');

/**
 * 封装构建模式构建任务
 */
class BuildTask extends Task {
    /**
     * 个性化的配置延迟交由子类来实现：执行构建
     * @param {*} env
     * @param {*} appInfo
     * @param {*} pathInfo
     */
    execute({ env, appInfo, pathInfo }) {
        process.env.BUILD_ENV = env;
        process.env.BUILD_MODE = 'appBundle';
        
        let envType = env;
        
        const envArr = env.split('_');
        if(envArr.length>1){
            envType=envArr[0];
        }

        // 获取webpack的编译配置
        const compilerConfig = require(`../config/webpack.${envType}.conf`).getConfig({ env: envType, appInfo, pathInfo });

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
}

module.exports = BuildTask;
