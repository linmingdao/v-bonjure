const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { AutoWebPlugin } = require('web-webpack-plugin');

// AutoWebPlugin处理多页应用
const autoWebPlugin = new AutoWebPlugin(path.resolve(__dirname, '../apps'), {
    // 页面依赖的模板
    template: pageName => {
        return path.resolve('./apps', pageName, 'index.html');
    },
    outputPagemap: true,
    // 所有页面依赖的通用的样式
    postEntrys: [path.resolve(__dirname, '../common.css')],
    // 提取所有页面的公共代码
    commonsChunk: {
        name: 'common'
    }
});

module.exports = {
    entry: autoWebPlugin.entry({}),
    output: {
        filename: '[name]/js/[name].bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        // AutoWebPlugin处理多页应用
        autoWebPlugin,
        // MiniCssExtractPlugin插件剥离样式文件
        new MiniCssExtractPlugin({
            filename: "[name]/style/style.css"
        }),
        // VueLoader插件处理*.vue文件
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
                    },
                    // {
                    //     loader: 'style-loader',
                    // },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ],
                // exclude: /node_modules/
            },
            // 加载图片
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
                // exclude: /node_modules/
            },
            // 加载字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
                // exclude: /node_modules/
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