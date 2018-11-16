const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const DefinePlugin = require('webpack/lib/DefinePlugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { AutoWebPlugin } = require('web-webpack-plugin');

// 是否使用公共模板
let useCommonTemplate = true;
const COMMON_TEMPLATE_PATH = path.resolve(__dirname, '../core/template.html');
const autoWebPlugin = new AutoWebPlugin(path.resolve(__dirname, '../apps'), {
    // 页面依赖的模板
    template: pageName => {
        return useCommonTemplate ? COMMON_TEMPLATE_PATH : path.resolve('./apps', pageName, 'index.html');
    },
    // 所有页面依赖的通用的样式
    postEntrys: [path.resolve(__dirname, '../common.css')],
    // 提取所有页面的公共代码
    commonsChunk: {
        name: 'common'
    }
});

module.exports = {
    devtool: 'inline-source-map',
    entry: autoWebPlugin.entry({}),
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        autoWebPlugin,
        new VueLoaderPlugin(),
        // new DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: JSON.stringify('production')
        //     }
        // }),
        // new UglifyJsPlugin({
        //     beautify: false,
        //     comments: false,
        //     compress: {
        //         warnings: false,
        //         drop_console: false,
        //         collapse_vars: true,
        //         reduce_vars: true
        //     }
        // })
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
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    }, {
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