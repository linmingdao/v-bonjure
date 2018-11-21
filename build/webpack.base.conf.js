const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    moduleRules: [
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
            exclude: [
                /node_modules/,
                // 特别注意：过滤掉HtmlWebpackPlugin的模板文件(新版本的HtmlWebpackPlugin不需要html-loader了)
                `${CORE_PATH}/template.html`,
                `${APP_PATH}/template.html`
            ]
        },
        // 处理.vue文件
        {
            test: /\.vue$/,
            use: ['vue-loader'],
            exclude: /node_modules/
        }
    ]
};