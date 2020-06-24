const fs = require('fs');
const path = require('path');
const copydir = require('copy-dir');
const Environment = require('../environment');

/**
 * 封装构建模式构建任务
 */
class InitTask extends Environment {
    /**
     * 校验环境信息
     */
    validate({ envParams, existentAppNameList }) {
        const { app, title } = envParams;

        if (typeof app === 'undefined') {
            return '请通过 app=??? 的形式指定应用名称';
        }

        if (typeof title === 'undefined') {
            return `请通过 title=??? 的形式指定页面的title信息`;
        }

        // 校验应用名称
        if (existentAppNameList.includes(app)) {
            return `已经存在名称为 ${app} 的应用了，请换一个`;
        }

        return true;
    }

    /**
     * 准备问题列表
     */
    getQuestions({ existentAppNameList }) {
        return [
            {
                type: 'input',
                name: 'app',
                message: 'app name:',
                validate: function(name) {
                    if (existentAppNameList.includes(name)) {
                        return `已经存在名称为 ${name} 的应用了，请换一个`;
                    } else {
                        return true;
                    }
                }
            },
            {
                type: 'input',
                name: 'title',
                message: 'app title:',
                default: 'index'
            },
            {
                type: 'list',
                name: 'template',
                message: 'choose template:',
                choices: ['blank', 'admin', 'admin-router'],
                default: 'blank'
            }
        ];
    }

    /**
     * 拷贝模板工程至指定的要创建的项目目录
     * @param {*} app
     * @param {*} template
     */
    copyTemplate(app = '', template = 'blank') {
        const from = path.join(process.cwd(), 'template', template);
        const to = path.join(process.cwd(), 'apps', app);
        this.logger.info(`init started ${from} -> ${to}.`);
        // 拷贝模板工程
        copydir.sync(from, to, {
            utimes: true,
            mode: true,
            cover: true
        });
        this.logger.info(`template copy completed.`);
    }

    /**
     * 更新配置文件
     * @param {*} config
     */
    updateConfig(config) {
        // 反序列化build.json配置文件
        let content = this.deserializeBuildJson(config.name);
        // 更新配置信息
        Object.assign(content, config);
        // 重新写入配置信息
        this.writeFile(config.name, content);
        this.logger.info('update the configuration completed.');
        this.logger.info('init done.');
    }

    /**
     * 读取文件并反序列化
     * @param {*} app
     */
    deserializeBuildJson(app) {
        const stream = fs.readFileSync(path.join(process.cwd(), 'apps', app, 'build.json'));
        return JSON.parse(stream.toString());
    }

    /**
     * 写入文件
     * @param {*} app
     * @param {*} content
     */
    writeFile(app, content) {
        fs.writeFileSync(path.join(process.cwd(), 'apps', app, 'build.json'), JSON.stringify(content));
    }

    /**
     * 个性化的配置延迟交由子类来实现：执行构建
     * @param {*} app
     * @param {*} env
     * @param {*} appInfo
     */
    execute({ app, title, template }) {
        // 将模板工程拷贝到apps目录下
        this.copyTemplate(app, template);
        // 更新配置信息
        this.updateConfig({ name: app, title: title });

        if (template === 'admin' || template === 'admin-router') {
            // 自动安装相关依赖
            this.logger.info('installing dependencies...');
            this.execCommandSync(`cd apps/${app}&&npm --registry https://registry.npm.taobao.org i`);
        }
    }
}

module.exports = InitTask;
