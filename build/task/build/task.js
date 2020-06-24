const Environment = require('../environment');

/**
 * 构建相关的任务基类，封装通用的构建流程
 */
class Task extends Environment {
    /**
     * 校验环境信息
     */
    validate({ envParams, existentAppNameList, availableEnvValueList,realAvailableEnv }) {
        const { env, app } = envParams;

        if (typeof app === 'undefined') {
            return '请通过 app=??? 的形式指定应用名称';
        }

        if (typeof env === 'undefined') {
            return `请通过 env=[${availableEnvValueList.join('|')},${availableEnvValueList.map(item=>item+'_xxx').join(',')}] 的形式指定环境信息`;
        }

        // 校验应用名称
        if (!existentAppNameList.includes(app)) {
            return `不存在名称为${app}的应用`;
        }

        // 校验环境参数是否存在 build.json 配置中
        if (!realAvailableEnv.includes(env) || !availableEnvValueList.includes(env.split('_')[0])) {
            return `环境参数${env}不符合要求, 目前支持的环境参数为: ${availableEnvValueList.join(',')},${availableEnvValueList.map(item=>item+'_xxx').join(',')}`;
        }

        return true;
    }

    /**
     * 准备问题列表
     */
    getQuestions({ existentAppNameList, availableEnvValueList }) {
        return [
            {
                type: 'list',
                name: 'app',
                message: 'choose app:',
                choices: existentAppNameList,
                default: existentAppNameList[0]
            },
            {
                type: 'list',
                name: 'env',
                message: 'choose env:',
                choices: (answers)=>{
                    availableEnvValueList = this.resolveAvailableEnvValueList(answers.app);
                    return availableEnvValueList;
                },
                default: availableEnvValueList[0]
            }
            // {
            //     type: 'list',
            //     name: 'env',
            //     message: 'choose env:',
            //     choices: availableEnvValueList,
            //     default: availableEnvValueList[0]
            // }
        ];
    }
}

module.exports = Task;
