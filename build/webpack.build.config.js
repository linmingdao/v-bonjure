const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const targetName = 'index';
const templatePath = path.resolve(__dirname, '../core/template.html');

module.exports = {
    // 启用source-map
    // devtool: 'inline-source-map',
    // 应用打包入口
    entry: {
        [targetName]: path.resolve(__dirname, `../apps/${targetName}/index.js`)
    },
    // 打包出口
    output: {
        filename: 'js/index.bundle.[hash].js',
        path: path.resolve(__dirname, `../dist/${targetName}`),
        // 上线该配置需要配置成线上地址
        publicPath: path.resolve(__dirname, `../dist/${targetName}/`).replace(/\\/g, '/'),
        // publicPath: "http://localhost:3002"
    },
    plugins: [
        // 打包前自动清除旧打包文件
        new CleanWebpackPlugin([targetName], {
            root: path.resolve(__dirname, `../dist`),
            verbose: true,
            dry: false
        }),
        // 自动生成logo的favicon.ico文件
        new FaviconsWebpackPlugin({
            logo: path.resolve(__dirname, `../apps/${targetName}/logo.png`),
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
            title: 'v-bonjour',
            filename: "index.html",
            template: templatePath,
            minify: {
                //是否大小写敏感
                caseSensitive: false,
                // 去除注释
                removeComments: true,
                // 去除空属性
                removeEmptyAttributes: true,
                //是否去除空格
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        }),
        // 剥离样式文件
        new MiniCssExtractPlugin({
            filename: "css/style.bundle.[hash].css"
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
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader'
                }]
            },
            // 加载图片
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        name: "/assets/images/[name].[hash].[ext]"
                    }
                }]
            },
            // 加载字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        name: "/assets/fonts/[name].[hash].[ext]"
                    }
                }]
            },
            // 处理html模板
            {
                test: /\.html$/,
                use: ['html-loader'],
                exclude: /node_modules/
            },
            // 处理.vue文件
            {
                test: /\.vue$/,
                use: ['vue-loader'],
                exclude: /node_modules/
            }
        ]
    }
};