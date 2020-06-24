const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');

function base(commonBase) {
    return {
        // 公共的配置信息
        ...commonBase,
        // 启用source-map
        devtool: 'cheap-eval-source-map'
    };
}

function output(pathInfo) {
    return {
        path: pathInfo['app_dist'],
        filename: 'js/index.bundle.[chunkhash].js',
        publicPath: '/'
    };
}

function plugins(pathInfo, commonPlugins, env) {
    return [
        new CleanWebpackPlugin([env], {
            root: path.resolve(pathInfo['app_dist'], '..'),
            verbose: true,
            dry: false
        }),
        // 公共插件配置
        ...commonPlugins,
        new OptimizeCssnanoPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
                drop_console: true
            },
            cssnanoOptions: {
                preset: [
                    'default',
                    {
                        discardComments: {
                            removeAll: true
                        }
                    }
                ]
            }
        })
    ];
}

function rules(commonRules) {
    return [
        // 公共规则配置
        ...commonRules
    ];
}

/**
 * 开发环境应用打包构建配置文件
 */
module.exports = {
    /**
     * 获取对应环境的webpack编译打包配置信息
     * @param {Object} env
     * @param {Object} appInfo
     * @param {Object} pathInfo
     */
    getConfig({ env, appInfo, pathInfo }) {
        // 获取webpack公共配置
        const baseConfig = require('./webpack.base.conf').getConfig({ appInfo, pathInfo });
        return {
            // 基础配置
            ...base(baseConfig.base),
            // 应用打包出口
            output: output(pathInfo),
            // 插件配置
            plugins: plugins(pathInfo, baseConfig.plugins, env),
            module: {
                // 规则配置
                rules: rules(baseConfig.rules)
            }
        };
    }
};
