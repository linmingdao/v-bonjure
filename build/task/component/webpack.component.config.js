const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    /**
     * 获取构建第三库的webpack编译配置信息
     * @param {String} componentName
     */
    getConfig({ componentName }) {
        return {
            mode: 'production',
            entry: path.join(process.cwd(), `components/${componentName}/src/index.js`),
            output: {
                path: path.join(process.cwd(), `components/${componentName}/dist`),
                filename: 'index.min.js'
            },
            resolve: {
                // 自动补全的扩展名
                extensions: ['.js', '.vue', '.json'],
                // 获取别名信息
                alias: require('../build/config/alias').getAlias({})
            },
            // 防止打包脚本过大，这些文件不进行打包，需要应用自己导入
            externals: {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                vuex: 'Vuex',
                'element-ui': 'Element'
            },
            optimization: {
                minimizer: [
                    new TerserPlugin({
                        test: /\.js(\?.*)?$/i,
                        exclude: /node_modules/
                    })
                ]
            },
            module: {
                rules: [
                    // 使用Babel处理js文件
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        // 2019/10/11 Roy
                        // 现象：子项目js无法编译，实测发现是因为babel配置文件问题
                        // 故暂时删除目录下的babel配置文件,将配置写在此处
                        use: {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                presets: ['@babel/preset-env'],
                                plugins: [
                                    [
                                        '@babel/plugin-transform-runtime',
                                        {
                                            corejs: 3
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    // 使用PostCSS处理css文件
                    {
                        test: /\.css$/,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader
                            },
                            {
                                loader: 'css-loader',
                                options: { importLoaders: 1 }
                            },
                            {
                                loader: 'postcss-loader'
                            }
                        ]
                    },
                    // 加载图片
                    {
                        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                        use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    limit: 10000,
                                    name: `assets/images/[name].[chunkhash].[ext]`
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
                        use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    limit: 10000,
                                    name: `assets/fonts/[name].[chunkhash].[ext]`
                                }
                            }
                        ]
                    },
                    // 加载媒体资源
                    {
                        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: `assets/media/[name].[chunkhash].[ext]`
                        }
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            removeComments: false,
                            collapseWhitespace: false
                        },
                        exclude: [/node_modules/]
                    },
                    // 处理.vue文件
                    {
                        test: /\.vue$/,
                        use: ['vue-loader'],
                        exclude: /node_modules/
                    }
                ]
            },
            plugins: [
                // 剥离样式文件
                new MiniCssExtractPlugin({
                    // 输出文件【注意：这里的根路径是module.exports.output.path】
                    filename: 'style.min.css'
                }),
                // 处理*.vue文件
                new VueLoaderPlugin(),
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
                }),
                // 更友好的错误提示
                new FriendlyErrorsWebpackPlugin({
                    clearConsole: true
                })
            ]
        };
    }
};
