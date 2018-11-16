const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

console.log(path.resolve(__dirname, "../dist/"))

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        index: './src/app/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist/js'),
        publicPath: '/assets/'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/index.html'),
            inject: 'body',
            template: './src/app/index.html',
            // minify: { //压缩HTML文件
            //     removeComments: true, //移除HTML中的注释
            //     collapseWhitespace: true, //删除空白符与换行符
            //     // 为了使GAEA能正确识别script, 保留引号
            //     // removeAttributeQuotes: true,
            //     minifyJS: true,
            //     removeScriptTypeAttributes: true,
            //     removeStyleLinkTypeAttributes: true
            // }
        }),
        new Webpack.NamedModulesPlugin(),
        new Webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "../dist"),
        watchContentBase: true,
        // compress: true,
        // hot: true,
        port: 3002,
        // stats: {
        //     colors: true,
        //     children: false,
        //     chunks: false,
        //     assetsSort: 'size'
        // }
    },
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
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    }
                }, {
                    loader: 'postcss-loader'
                }],
                exclude: /node_modules/
            },
            // 加载图片
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
                exclude: /node_modules/
            },
            // 加载字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
                exclude: /node_modules/
            },
            // 接入Vue框架
            {
                test: /\.vue$/,
                use: ['vue-loader'],
                exclude: /node_modules/
            }
        ]
    }
};