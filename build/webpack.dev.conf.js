const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');

// TODO: 提取成用户输入的
const app = 'demo';
const title = 'v-bonjour';
const useDefaultTemplate = true;

// 框架内核目录
const CORE_PATH = path.resolve(__dirname, '../core');
// 应用的开发目录
const APP_PATH = path.resolve(__dirname, `../apps/${app}`);
// 所有应用打包路径
const DIST_PATH = path.resolve(__dirname, `../distDev`);
// 应用的打包目录
const APP_DIST_PATH = `${DIST_PATH}/${app}`;
// 打包模板的路径
const TEMPLATE_PATH = useDefaultTemplate ? `${CORE_PATH}/template.html` : `${APP_PATH}/template.html`;

module.exports = {
    // 启用source-map
    devtool: 'source-map',
    // 应用打包入口
    entry: {
        [app]: `${APP_PATH}/index.js`
    },
    // 打包出口
    output: {
        filename: 'js/index.bundle.js',
        path: APP_DIST_PATH,
        // 上线该配置需要配置成线上地址
        publicPath: "/"
    },
    // 本地开发服务器配置
    devServer: {
        contentBase: APP_DIST_PATH,
        host: '127.0.0.1',
        port: 3002,
        proxy: {
            "http://127.0.0.1:3002/*": {
                target: 'http://localhost:9000',
                changeOrigin: true,
                secure: false
            }
        },
        compress: true,
        clientLogLevel: 'info',
        overlay: true
    },
    // 设置一些常用路径的别名，方便业务开发者导入
    resolve: {
        alias: {
            '@vbonjour/App': path.resolve(__dirname, '../core/app'),
            '@vbonjour/Logger': path.resolve(__dirname, '../core/sherry'),
            '@vbonjour/Http': path.resolve(__dirname, '../core/http'),
            '@vbonjour/Notification': path.resolve(__dirname, '../core/notification/notification'),
            '@vbonjour/notificator': path.resolve(__dirname, '../core/notification/notificator'),
            '@vbonjour/router': path.resolve(__dirname, '../core/routes/router'),
            '@vbonjour/components': path.resolve(__dirname, '../components'),
            '@vbonjour/tools': path.resolve(__dirname, '../tools')
        }
    },
    // 防止打包脚本过大，这些文件不进行打包，需要应用自己导入
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        // 'axios': 'axios',
        'element-ui': 'Element'
    },
    plugins: [
        // new UglifyJsPlugin(),
        // new OptimizeCssnanoPlugin({
        //     sourceMap: true,
        //     // compress: {
        //     //     warnings: false,
        //     //     drop_console: true
        //     // },
        //     cssnanoOptions: {
        //         preset: ['default', {
        //             discardComments: {
        //                 removeAll: true,
        //             },
        //         }],
        //     },
        // }),
        // 自动生成logo的favicon.ico文件
        new FaviconsWebpackPlugin({
            logo: `${APP_PATH}/logo.png`,
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
            title,
            filename: "index.html",
            template: TEMPLATE_PATH,
            inject: true,
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
            filename: "css/style.bundle.[hash:7].css"
        }),
        // 处理*.vue文件
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
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
                        loader: 'postcss-loader'
                    }
                ]
            },
            // 加载图片
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    // 图片size小于8K自动转成base64
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: "/assets/images/[name].[hash:7].[ext]"
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
                        limit: 10000,
                        name: "/assets/fonts/[name].[hash:7].[ext]"
                    }
                }]
            },
            // 加载媒体资源
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: "/assets/media/[name].[hash:7].[ext]"
                }
            },
            // 处理html模板(暂时不需要，先注释掉)
            // {
            //     test: /\.html$/,
            //     use: ['html-loader'],
            //     exclude: [
            //         /node_modules/,
            //         // 特别注意：过滤掉HtmlWebpackPlugin的模板文件(新版本的HtmlWebpackPlugin不需要html-loader了)
            //         `${CORE_PATH}/template.html`,
            //         `${APP_PATH}/template.html`
            //     ]
            // },
            // 处理.vue文件
            {
                test: /\.vue$/,
                use: ['vue-loader'],
                exclude: /node_modules/
            }
        ]
    }
};