const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 本地开发模式
const DEV_SERVER = 'devServer';

// 应用打包模式
const APP_BUNDLE = 'appBundle';

// 读取当前webpack的构建模式和构建环境参数信息
const BUILD_ENV = process.env.BUILD_ENV;
const BUILD_MODE = process.env.BUILD_MODE;

/**
 * 构建HtmlWebpackPlugin插件
 * @param {*} appInfo
 * @param {*} pathInfo
 */
function buildHtmlWebpackPlugin(appInfo, pathInfo) {
    const appStatic = appInfo.static || {};
    const { replace = false, scripts = [], styles = [] } = appStatic;

    // 依赖的外部脚本
    const staticScripts = replace
        ? scripts
        : Array.from(
              new Set([
                  // 本地资源的方式引入（默认的方式）
                  '/libs/vue.js',
                  '/libs/vuex.js',
                  '/libs/vue-router.js',
                  '/libs/element-ui/element-ui.js',
                  ...scripts
              ])
          );

    // 依赖的外部样式
    const staticStyles = replace
        ? styles
        : Array.from(
              new Set([
                  // 本地资源的方式引入（默认的方式）
                  '/libs/element-ui/element-ui.css',
                  ...styles
              ])
          );

    // 返回插件实例
    return new HtmlWebpackPlugin({
        title: appInfo.title,
        filename: 'index.html',
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
        },
        static: {
            scripts: staticScripts,
            styles: staticStyles
        }
    });
}

/**
 * 构建CopyWebpackPlugin插件
 * @param {*} appInfo
 * @param {*} pathInfo
 */
function buildCopyWebpackPlugin(appInfo, pathInfo) {
    const { replace = false } = appInfo;

    const options = [];
    const libPath = {};
    const distPath = BUILD_MODE === APP_BUNDLE ? pathInfo['app_dist_libs'] : 'libs';

    if (!replace) {
        fs.readdirSync(pathInfo['libs']).forEach(n => {
            libPath[n] = path.join(pathInfo['libs'], n);
        });
    }

    fs.existsSync(pathInfo['app_libs']) &&
        fs.readdirSync(pathInfo['app_libs']).forEach(n => {
            libPath[n] = path.join(pathInfo['app_libs'], n);
        });

    for (const key in libPath) {
        if (libPath.hasOwnProperty(key)) {
            const item = libPath[key];
            options.push({
                from: item,
                to: path.join(distPath, key),
                ignore: ['.*']
            });
        }
    }

    return new CopyWebpackPlugin(options);
}

/**
 * 根据构建模式和构建环境获取webpack打包的mode信息
 */
function getMode() {
    if (BUILD_MODE === 'appBundle') {
        return {
            dev: 'development',
            test: 'development',
            prep: 'development',
            prod: 'production'
        }[BUILD_ENV];
    } else {
        return 'development';
    }
}

/**
 * 获取编译的基础配置信息
 * @param {Object} appInfo
 * @param {Object} pathInfo
 */
function base({ appInfo, pathInfo }) {
    return {
        mode: getMode(),
        // 应用打包入口配置
        entry: {
            [appInfo.name]: path.resolve(pathInfo['app_src'], appInfo['entry'])
        },
        // 设置一些常用路径的别名，方便业务开发者导入
        resolve: {
            // 自动补全的扩展名
            extensions: ['.js', '.vue', '.json'],
            // 获取别名信息
            alias: require('./alias').getAlias(appInfo)
        },
        // 防止打包脚本过大，这些文件不进行打包，需要应用自己导入
        externals: {
            vue: 'Vue',
            'vue-router': 'VueRouter',
            vuex: 'Vuex',
            'element-ui': 'Element',
            ...(appInfo['externals'] ? appInfo['externals'] : {})
        },
        optimization: {
            // 开启Scope Hoisting
            concatenateModules: true,
            minimizer: [
                new TerserPlugin({
                    // 使用 cache，加快二次构建速度
                    cache: true,
                    // 开启多线程压缩，减少构建时间
                    parallel: true,
                    test: /\.js(\?.*)?$/i,
                    exclude: /node_modules/,
                    terserOptions: {
                        comments: false,
                        compress: {
                            // 删除无用的代码
                            unused: true,
                            // 删掉 debugger
                            drop_debugger: true, // eslint-disable-line
                            // 移除 console
                            drop_console: true, // eslint-disable-line
                            // 移除无用的代码
                            dead_code: true // eslint-disable-line
                        }
                    }
                })
            ],
            splitChunks: {
                // 三选一： "initial" | "all" | "async" (默认)
                chunks: 'all',
                // 最小尺寸，30K，development 下是10k，越大那么单个文件越大，
                // chunk 数就会变少（针对于提取公共 chunk 的时候，不管再大也不会把动态加载的模块合并到初始化模块中）当这个值很大的时候就不会做公共部分的抽取了
                minSize: 30000,
                // 文件的最大尺寸，0为不限制，优先级：maxInitialRequest/maxAsyncRequests < maxSize < minSize
                maxSize: 0,
                // 默认1，被提取的一个模块至少需要在几个 chunk 中被引用，这个值越大，抽取出来的文件就越小
                minChunks: 1,
                // 在做一次按需加载的时候最多有多少个异步请求，为 1 的时候就不会抽取公共 chunk 了
                maxAsyncRequests: 5,
                // 针对一个 entry 做初始化模块分隔的时候的最大文件数，优先级高于 cacheGroup，所以为 1 的时候就不会抽取 initial common 了
                maxInitialRequests: 3,
                // 打包文件名分隔符
                automaticNameDelimiter: '~',
                // 拆分出来文件的名字，默认为 true，表示自动生成文件名，如果设置为固定的字符串那么所有的 chunk 都会被合并成一个
                name: true,
                cacheGroups: {
                    vendors: {
                        // 正则规则，如果符合就提取 chunk
                        test: /[\\/]node_modules[\\/]/,
                        // 缓存组优先级，当一个模块可能属于多个 chunkGroup，这里是优先级
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        // 优先级
                        priority: -20,
                        // 如果该chunk包含的modules都已经另一个被分割的chunk中存在，那么直接引用已存在的chunk，不会再重新产生一个
                        reuseExistingChunk: true
                    }
                }
            }
        }
    };
}

/**
 * 获取编译的插件配置
 * @param {Object} appInfo
 * @param {Object} pathInfo
 * @param {String} analyzer
 */
function plugins({ appInfo, pathInfo, analyzer }) {
    const plugins = [
        // 需要用webpack.DefinePlugin插件定义node环境变量，否则前端js文件获取不到设置的环境变量信息
        new webpack.DefinePlugin({
            'process.env.BUILD_MODE': JSON.stringify(BUILD_MODE),
            'process.env.BUILD_ENV': JSON.stringify(BUILD_ENV),
            'process.env.APP_INFO': JSON.stringify(appInfo)
        }),
        // 自动生成logo的favicon.ico文件
        new FaviconsWebpackPlugin({
            logo: `${pathInfo.app}/${appInfo.logo}`,
            prefix: 'icons/',
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
        buildHtmlWebpackPlugin(appInfo, pathInfo),
        // 剥离样式文件
        new MiniCssExtractPlugin({
            // 输出文件【注意：这里的根路径是module.exports.output.path】
            filename: `css/style.bundle${BUILD_MODE === DEV_SERVER ? '' : '.[chunkhash]'}.css`
        }),
        // 处理*.vue文件
        new VueLoaderPlugin(),
        // 更友好的错误提示
        new FriendlyErrorsWebpackPlugin({
            clearConsole: true
        }),
        // 构建CopyWebpackPlugin插件：作用是拷贝一些外部库文件
        buildCopyWebpackPlugin(appInfo, pathInfo)
    ];
    analyzer === 'enable' &&
        plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'server',
                generateStatsFile: true,
                statsOptions: { source: false }
            })
        );
    return plugins;
}

/**
 * 获取编译的规则配置
 * @param {Object} pathInfo
 */
function rules({ pathInfo }) {
    return [
        // ESLint配置
        {
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
        },
        // 使用Babel处理js文件
        {
            test: /\.js$/,
            // use: ['babel-loader'],
            exclude: /node_modules/,
            // 2019/10/11 Roy
            // 现象：子项目js无法编译，实测发现是因为babel配置文件问题
            // 故暂时删除目录下的babel配置文件,将配置写在此处
            use: {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: [
                        '@babel/preset-env'
                        // [
                        //     '@babel/preset-env',
                        //     {
                        //         targets: {
                        //             edge: '17',
                        //             firefox: '60',
                        //             chrome: '67',
                        //             safari: '11.1',
                        //             ie: '10'
                        //         }
                        //     }
                        // ]
                    ],
                    plugins: [
                        [
                            '@babel/plugin-transform-runtime',
                            {
                                // 3: 实现对于实例方法的支持
                                corejs: 3
                            }
                        ]
                    ]
                }
            }
        },
        // 加载图片
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            exclude: [path.join(pathInfo.app_src, 'icons')],
            use: [
                // 图片size小于10K自动转成base64
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000, // 10000
                        // name: `assets/images/[name]${BUILD_MODE === DEV_SERVER ? '' : '.[chunkhash]'}.[ext]`
                        name: `assets/images/[name].[ext]`
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
                            enabled: false
                        },
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false
                        },
                        // the webp option will enable WEBP
                        webp: {
                            quality: 75
                        }
                    }
                }
            ]
        },
        // 处理svg图标
        {
            test: /\.svg$/,
            loader: 'svg-sprite-loader',
            include: [path.join(pathInfo.app_src, 'icons')],
            options: {
                symbolId: 'icon-[name]'
            }
        },
        // 加载字体
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000, // 10000
                        name: `assets/fonts/[name]${BUILD_MODE === DEV_SERVER ? '' : ''}.[ext]`
                    }
                }
            ]
        },
        // 加载媒体资源
        {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000, // 10000
                name: `assets/media/[name]${BUILD_MODE === DEV_SERVER ? '' : '.[chunkhash]'}.[ext]`
            }
        },
        // 加载html模板
        {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                minimize: true,
                removeComments: false,
                collapseWhitespace: false
            },
            exclude: [
                // /node_modules/,
                path.resolve(pathInfo.app, 'template.html'),
                path.resolve(pathInfo.core, 'template.html')
            ]
        },
        // 处理.vue文件
        {
            test: /\.vue$/,
            use: ['vue-loader']
            // ,
            // exclude: /node_modules/
        },
        getCssLoaderConfig()
    ];
}

function getCssLoaderConfig() {
    let useArr = [
        {
            loader: 'css-loader',
            options: { importLoaders: 1 }
        },
        // 使用postcss处理最原始的样式文件
        {
            loader: 'postcss-loader'
        }
    ];
    // 开发模式，以<style>标签的形式将css-loader内部的样式注入到html页面(由于要单独剥离css,所以不需要该loader),否则提取样式为单独的文件
    useArr.unshift({
        loader: BUILD_MODE === DEV_SERVER ? 'style-loader' : MiniCssExtractPlugin.loader
    });
    return {
        test: /\.css$/,
        use: useArr
    };
}

module.exports = {
    /**
     * 获取公共的webpack编译配置信息
     * @param {Object} appInfo
     * @param {Object} pathInfo
     * @param {String} analyzer
     */
    getConfig({ appInfo, pathInfo, analyzer = 'disable' }) {
        return {
            base: base({ appInfo, pathInfo }),
            rules: rules({ appInfo, pathInfo }),
            plugins: plugins({ appInfo, pathInfo, analyzer })
        };
    }
};
