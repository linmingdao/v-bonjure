const webpack = require('webpack');
const Environment = require('../environment');

/**
 * 封装构建第三方组件的构建任务
 */
class ComponentTask extends Environment {
    /**
     * 校验环境信息
     * @param {Object} envParams
     * @param {Array} existentAppNameList
     */
    validate({ envParams, existentComponentsNameList }) {
        const { componentName } = envParams;
        if (typeof componentName === 'undefined') {
            return '请通过 componentName=??? 的形式指定要打包的第三库';
        }
        // 校验应用名称
        if (!existentComponentsNameList.includes(componentName)) {
            return `不存在名称为${componentName}的第三方库`;
        }
        return true;
    }

    /**
     * 准备问题列表
     */
    getQuestions() {
        const existentComponentsNameList = this.resolveExistentComponentsNameList();
        return [
            {
                type: 'list',
                name: 'componentName',
                message: 'choose component:',
                choices: existentComponentsNameList,
                default: existentComponentsNameList[0]
            }
        ];
    }

    /**
     * 个性化的配置延迟交由子类来实现：执行构建
     * @param {String} componentName
     */
    execute({ componentName }) {
        // 获取webpack的编译配置
        const compilerConfig = require('./webpack.component.config').getConfig({ componentName });
        // 打包组件库
        webpack(compilerConfig, (err, stats) => {
            if (err) {
                console.log(err.stack || err);
                if (err.details) {
                    console.log(err.details);
                }
                return;
            }
            if (!stats.hasErrors()) {
                console.log(`第三方库 ${componentName} 构建成功`);
            }
        });
    }
}

module.exports = ComponentTask;
