/**
 * Created by yanshan on 2017/7/5.
 */

let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let OpenBrowserPlugin = require('open-browser-webpack-plugin');
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    context: __dirname + "/src",
    entry: {
        index: "./js/index.js",
        vendor: ['./js/lib/properScreen.js','./js/lib/properScreen_css.js'],
    },
    output: {
        filename: "js/[name].bundle.js",
    },
    devServer: {
        contentBase: __dirname +'/src',
        port: 3000,
    },
    module: {
        loaders:[
            {
                test: /\.html$/,
                loader: "html-loader?-minimize",
                options: {
                    attrs:'img:src img:data-src'
                }
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },{
                test: /\.css$/,
                loader: 'style-loader!css-loader!'
            },{
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader!px2rem-loader?remUnit=75&remPrecision=8'
            }, {
                test:/\.(png|jpg)$/,
                loader: 'url-loader',
                options: { limit: 1048576 }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: { limit: 1048576 }
            }, {
                test: require.resolve('jquery'),
                loader: 'expose-loader?$expose-loader?jQuery'
            },{
                test: require.resolve('tether'),
                loader: 'expose-loader?tether'
            },{
                test: require.resolve('d3'),
                loader: 'expose-loader?d3'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV:JSON.stringify('development')
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            d: 'd3'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "js/commons.js",
            minChunks: 3,
        }),

        new HtmlWebpackPlugin({
            filename: 'views/index.html',
            template: 'views/index.html',
            chunks: ['index','vendor']
        }),
        new OpenBrowserPlugin({
            url: 'http://localhost:3000/views/index.html'
        }),

        new FriendlyErrorsPlugin()
    ]
};