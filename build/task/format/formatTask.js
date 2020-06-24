const fs = require('fs');
const path = require('path');
const Environment = require('../environment');
const include = require('../../../config.json').format.include;

/**
 * 封装构建模式构建任务
 */
class FormatTask extends Environment {
    /**
     * 校验环境信息
     * @param {Object} envParams
     * @param {Array} existentAppNameList
     */
    validate({ envParams, existentAppNameList }) {
        const { mode, app, dir } = envParams;

        if (typeof mode === 'undefined') {
            return `请通过 mode=[${['app', 'dir', 'global'].join('|')}] 的形式指定格式化服务运行的【模式】`;
        }

        if (mode === 'app') {
            if (typeof app === 'undefined') {
                return '请通过 app=??? 的形式指定格式化服务要处理的【应用】';
            }
            // 校验应用名称
            if (!existentAppNameList.includes(app)) {
                return `不存在名称为${app}的应用`;
            }
        } else if (envParams.mode === 'dir') {
            if (typeof dir === 'undefined') {
                return '请通过 dir=??? 的形式指定格式化服务要处理的【目录】';
            }
        } else if (envParams.mode === 'global') {
        }

        return true;
    }

    /**
     * 准备问题列表
     */
    getQuestions() {
        const existentAppNameList = this.resolveExistentAppNameList();
        return [
            {
                type: 'list',
                name: 'mode',
                message: 'choose format mode:',
                choices: ['app', 'dir', 'global'],
                default: 'app'
            },
            {
                type: 'list',
                name: 'app',
                when: function(answers) {
                    return answers.mode === 'app';
                },
                message: 'choose app:',
                choices: existentAppNameList,
                default: existentAppNameList[0]
            },
            {
                type: 'input',
                name: 'dir',
                when: function(answers) {
                    return answers.mode === 'dir';
                },
                message: 'input dir:'
            }
        ];
    }

    /**
     * 生成完整路径数组
     * @param {String} mode 运行模式
     * @param {String} app 命令行参数集合
     * @param {String} dir 命令行参数集合
     */
    generateFullPathArray({ mode, app, dir }) {
        let fullPathArray = [];
        switch (mode) {
            case 'app':
                fullPathArray.push(path.join(process.cwd(), 'apps', app, 'src'));
                break;
            case 'dir':
                fullPathArray.push(path.join(process.cwd(), dir));
                break;
            case 'global':
                include.forEach(directory => {
                    fullPathArray.push(path.join(process.cwd(), directory));
                });
                break;
            default:
                fullPathArray = [];
        }
        return fullPathArray;
    }

    /**
     * 格式化代码
     * @param {String} fullPath 完整路径
     */
    formatCode(fullPath) {
        if (fs.existsSync(fullPath)) {
            this.logger.title('formating code').info(`${fullPath} started.`);
            this.execCommand(`npx eslint --fix --ext .vue,.js ${fullPath}`, {}, (err, stdout, sterr) => {
                this.logger.title('formating code').info(`${fullPath} done.`);
                if (err) {
                    this.logger.error(sterr);
                }
            });
        } else {
            this.logger.warning('指定的文件或者目录不存在，请确认.');
        }
    }

    /**
     * 个性化的配置延迟交由子类来实现：执行构建
     * @param {String} mode
     * @param {String} app
     * @param {String} dir
     */
    execute({ mode, app, dir }) {
        this.generateFullPathArray({ mode, app, dir }).forEach(fullPath => this.formatCode(fullPath));
    }
}

module.exports = FormatTask;
