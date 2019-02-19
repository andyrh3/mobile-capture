const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
/*
const WriteFileWebpackPlugin = require('./node_modules/write-file-webpack-plugin/dist/WriteFileWebpackPlugin.js');
*/

module.exports = {
    mode: "development",
    entry: [
        './src/js/index.js',
        './src/scss/styles.scss'
    ],
    output: {
        filename: './js/bundle.min.js'
    },
    module: {
        rules: [
            {
                test: /\.(png|gif|jpeg|jpg|svg)/,
                exclude:[/fonts/],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './images/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                exclude:[/images/],
                use: [{
                    loader: 'file-loader',
                    options: {
/*                        name: '[name].[ext]',
                        outputPath: '/fonts/'*/
                        name: '[name].[ext]',
                        mimetype: 'application/font-woff',
                        publicPath: '/fonts',
                        outputPath: './fonts/'
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    devServer: {
        publicPath: "/",
        contentBase: 'dist',
        host: 'localhost',
        port: 9001
    },
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: './src/index.html'
        }),
        new ExtractTextPlugin('./css/style.min.css')
    ],


};


