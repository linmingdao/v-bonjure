let CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const utils = require('./utils');

function base(appInfo, pathInfo, commonBase) {
    return {
        // 公共的配置信息
        ...commonBase,
        // 启用source-map
        devtool: '#source-map'
    };
}

function output(appInfo, pathInfo) {
    return {
        path: pathInfo.app_dist,
        filename: 'js/index.bundle.[chunkhash].js',
        // 上线该配置需要配置成线上地址
        publicPath: '/'
    };
}

function plugins(appInfo, pathInfo, commonPlugins) {
    return [
        new CleanWebpackPlugin([appInfo.name], {
            root: pathInfo.dist,
            verbose: true,
            dry: false
        }),
        // 公共插件配置
        ...commonPlugins,
        // js压缩插件
        new UglifyJsPlugin(),
        new OptimizeCssnanoPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
                drop_console: true
            },
            cssnanoOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true
                    }
                }]
            }
        }),
        new CopyWebpackPlugin([{
            from: pathInfo.libs,
            to: pathInfo.app_dist_libs,
            ignore: ['.*']
        }])
    ];
}

function rules(appInfo, pathInfo, commonRules) {
    return [
        // 公共规则配置
        ...commonRules
    ];
}

/**
 * 测试环境应用打包构建配置文件
 */
module.exports = {
    /**
     * 获取对应环境的webpack编译打包配置信息
     * @param {Object} appInfo
     */
    getConfig(appInfo) {
        // 获取app的相关路径信息
        const pathInfo = utils.pathInfo(appInfo);
        // 获取webpack公共配置
        const baseConfig = require('./webpack.base.conf').getConfig(appInfo, pathInfo);

        return {
            // 基础配置
            ...base(appInfo, pathInfo, baseConfig.base),
            // 应用打包出口
            output: output(appInfo, pathInfo),
            // 插件配置
            plugins: plugins(appInfo, pathInfo, baseConfig.plugins),
            module: {
                // 规则配置
                rules: rules(appInfo, pathInfo, baseConfig.rules)
            }
        };
    }
};