const InitTask = require('./init/initTask');
const FormatTask = require('./format/formatTask');
const ServeTask = require('./build/impl/serveTask');
const BuildTask = require('./build/impl/buildTask');
const DeployTask = require('./build/impl/deployTask');
const ComponentTask = require('./component/componentTask');

// 任务名称 与 任务构造器的映射关系
const mapper = {
    init: InitTask,
    build: BuildTask,
    serve: ServeTask,
    deploy: DeployTask,
    format: FormatTask,
    component: ComponentTask
};

/**
 * 任务工厂
 */
module.exports = {
    /**
     * 执行任务
     * @param {*} name 任务名
     */
    execute(name) {
        name = name.toLowerCase();
        const availableTasks = Object.keys(mapper);
        if (availableTasks.includes(name)) {
            new mapper[name]().run();
        } else {
            throw new Error(`暂不支持该任务，目前支持的任务如下：${availableTasks.join(',')}`);
        }
    }
};
