const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CONSTANTS = require('./constants');

// 获取当前环境
const NODE_ENV = process.env.NODE_ENV;

/**
 * 获取编译的基础配置
 * @param {Object} appInfo 
 * @param {Object} pathInfo 
 */
function base(appInfo, pathInfo) {
    return {
        // 应用打包入口配置
        entry: {
            [appInfo.name]: `${pathInfo.app}/${appInfo.entry}`
        },
        // 设置一些常用路径的别名，方便业务开发者导入
        resolve: {
            alias: {
                '@core/App': path.resolve(__dirname, '../core/app'),
                '@core/Logger': path.resolve(__dirname, '../core/sherry'),
                '@core/Http': path.resolve(__dirname, '../core/http'),
                '@core/Notification': path.resolve(__dirname, '../core/notification/notification'),
                '@core/notificator': path.resolve(__dirname, '../core/notification/notificator'),
                '@core/router': path.resolve(__dirname, '../core/routes/router'),
                '@core/components': path.resolve(__dirname, '../components'),
                '@core/tools': path.resolve(__dirname, '../tools')
            }
        },
        // 防止打包脚本过大，这些文件不进行打包，需要应用自己导入
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'element-ui': 'Element'
        }
    }
}

/**
 * 获取编译的插件配置
 * @param {Object} appInfo 
 * @param {Object} pathInfo 
 */
function plugins(appInfo, pathInfo) {
    return [
        // 自动生成logo的favicon.ico文件
        new FaviconsWebpackPlugin({
            logo: `${pathInfo.app}/${appInfo.logo}`,
            icons: {
                android: false,
                appleIcon: false,
                appleStartup: false,
                coast: false,
                favicons: true,
                firefox: false,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: false
            }
        }),
        // 生成模板文件
        new HtmlWebpackPlugin({
            title: appInfo.title,
            filename: "index.html",
            template: pathInfo.template,
            inject: true,
            // hash: true,
            // 压缩配置
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        // 剥离样式文件
        new MiniCssExtractPlugin({
            // 输出文件【注意：这里的根路径是module.exports.output.path】
            filename: `css/style.bundle${NODE_ENV === CONSTANTS.EVN.DEV_SERVER ? '' : '.[chunkhash]'}.css`
        }),
        // 处理*.vue文件
        new VueLoaderPlugin()
    ]
}

/**
 * 获取编译的规则配置
 * @param {Object} appInfo 
 * @param {Object} pathInfo 
 */
function rules(appInfo, pathInfo) {
    return [
        // 使用Babel处理js文件
        {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        },
        // 使用PostCSS处理css文件
        {
            test: /\.css$/,
            use: [
                // 提取样式为单独的文件
                {
                    loader: MiniCssExtractPlugin.loader
                },
                // 以<style>标签的形式将css-loader内部的样式注入到html页面(由于要单独剥离css,所以不需要该loader)
                // {
                //     loader: 'style-loader',
                // },
                // 以link的形式加载css文件
                {
                    loader: 'css-loader'
                },
                // 使用postcss处理最原始的样式文件
                {
                    loader: 'postcss-loader',
                    // options: {
                    //     warnForDuplicates: false
                    // }
                }
            ]
        },
        // 加载图片
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [
                // 图片size小于10K自动转成base64
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000, // 10000
                        name: `assets/images/[name]${NODE_ENV === CONSTANTS.EVN.DEV_SERVER ? '' : '.[chunkhash]'}.[ext]`
                    }
                },
                // 压缩图片
                {
                    loader: 'img-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
                        // optipng.enabled: false will disable optipng
                        optipng: {
                            enabled: false,
                        },
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        // the webp option will enable WEBP
                        webp: {
                            quality: 75
                        }
                    }
                }
            ]
        },
        // 加载字体
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000, // 10000
                    name: `assets/fonts/[name]${NODE_ENV === CONSTANTS.EVN.DEV_SERVER ? '' : '.[chunkhash]'}.[ext]`
                }
            }]
        },
        // 加载媒体资源
        {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000, // 10000
                name: `assets/media/[name]${NODE_ENV === CONSTANTS.EVN.DEV_SERVER ? '' : '.[chunkhash]'}.[ext]`
            }
        },
        // 处理.vue文件
        {
            test: /\.vue$/,
            use: ['vue-loader'],
            exclude: /node_modules/
        }
    ];
}

module.exports = {
    /**
     * 获取公共的webpack编译配置信息
     * @param {Object} appInfo
     * @param {Object} pathInfo
     */
    getConfig(appInfo, pathInfo) {
        return {
            base: base(appInfo, pathInfo),
            plugins: plugins(appInfo, pathInfo),
            rules: rules(appInfo, pathInfo)
        };
    }
};