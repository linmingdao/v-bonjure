const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

/**
 * 本地开发环境构建配置文件
 */
module.exports = {
    /**
     * 获取devServer的webpack编译配置信息
     * @param {Object} appInfo
     * @param {Object} pathInfo
     */
    getConfig({ appInfo, pathInfo }) {
        // 获取webpack公共配置
        const baseConfig = require('./webpack.base.conf').getConfig({ appInfo, pathInfo });
        return {
            // 公共的配置信息
            ...baseConfig.base,
            // 启用source-map
            devtool: 'source-map',
            // 应用打包出口配置
            output: {
                filename: 'js/index.bundle.js', // .[hash:7]
                path: pathInfo.app_dist,
                publicPath: '/'
            },
            plugins: [
                // 公共插件配置
                ...baseConfig.plugins,
                // 更加友好的webpack输出信息
                new FriendlyErrorsWebpackPlugin({
                    compilationSuccessInfo: {
                        messages: [
                            `Your application is running here: http://${appInfo.devServer.host}:${appInfo.devServer.port}`
                        ]
                    },
                    clearConsole: true
                }),
                // 直接在页面上输出错误信息
                new ErrorOverlayPlugin()
            ],
            module: {
                rules: [
                    // 公共规则配置
                    ...baseConfig.rules
                ]
            }
        };
    }
};
