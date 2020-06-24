const path = require('path');

module.exports = {
    /**
     * 根据项目信息获取别名信息
     * @param {*} name
     */
    getAlias({ name }) {
        const alias = {
            // 全局的工具库
            '@utils': path.join(process.cwd(), 'utils'),
            // 应用根节点路径别名
            '@app': path.join(process.cwd(), `apps/${name}/src`),
            '@assets': path.join(process.cwd(), `apps/${name}/src/assets`),
            '@fonts': path.join(process.cwd(), `apps/${name}/src/assets/fonts`),
            '@images': path.join(process.cwd(), `apps/${name}/src/assets/images`),
            // 框架内置的各种平台相关的服务
            '@services': path.join(process.cwd(), 'services'),
            // 框架内核相关的路径别名
            '@core/app': path.join(process.cwd(), 'core/app'),
            '@core/http': path.join(process.cwd(), 'core/http'),
            '@core/utils': path.join(process.cwd(), 'core/utils'),
            '@core/logger': path.join(process.cwd(), 'core/logger'),
            '@core/router': path.join(process.cwd(), 'core/routes/router'),
            '@core/loggerCmder': path.join(process.cwd(), 'core/logger/env/cmder'),
            '@core/notificator': path.join(process.cwd(), 'core/notification/notificator'),
            '@core/notification': path.join(process.cwd(), 'core/notification/notification'),
            // 全局组件相关的路径别名
            '@vBaseComponent': path.join(process.cwd(), 'components/v-base-component/src')
        };
        // 缓存别名信息
        process.env.ALIAS = JSON.stringify(alias);
        return alias;
    }
};
