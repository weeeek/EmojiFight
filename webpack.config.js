const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const srcDir = path.join(__dirname, './src');
// const distDir = path.join(__dirname, './dist');

module.exports = {
    entry: {
        index: ['webpack/hot/dev-server','webpack-dev-server/client?http://localhost:80','./src/js/main.js','./src/css/main.css']
    },//入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',
        filename: 'js/[name].min.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: 'css-loader'
                    },
                })
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [{
                    loader: 'url-loader'
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),

        new ExtractTextPlugin('style/[name].min.css'),
        new HtmlWebpackPlugin({
            hash: true,
            chunks: ['index'],
            template: "./index.html",
            filename: "index.html"
        }),
        new CopyWebpackPlugin([{
            from: __dirname + '/src/img',
            to: __dirname + '/dist/src/img',
        }, {
            from: __dirname + '/src/sound',
            to: __dirname + '/dist/src/sound',
        }]),
        new webpack.HotModuleReplacementPlugin(),
    ]
}