/**
 * Created by yanshan on 2017/7/5.
 */

let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    context: __dirname + "/src",
    entry: {
        index: "./js/index.js",
        vendor: ['./js/lib/properScreen.js','./js/lib/properScreen_css.js'],
    },
    output: {
        path: __dirname + "/dist/www\.sleep-mater\.com/",
        filename: "js/[name].bundle.js",
        publicPath: "../",
    },
    resolve: {
        alias: {
            'jquery': __dirname + '/src/js/lib/jQuery1.11.3.min.js',
            'swiper': __dirname +'/src/js/lib/swiper.jquery.js'
        }
    },
    module: {
        loaders:[
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    attrs:'img:src img:data-src'
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader','px2rem-loader']
                }),
            },
            {
                test:/\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: 1048576,
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1048576,
                    name: '[path][name].[ext]'
                }
            },
            {
                test: require.resolve('jquery'),
                loader: 'expose-loader?$expose-loader?jQuery'
            },{
                test: require.resolve('tether'),
                loader: 'expose-loader?tether'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV:JSON.stringify('production')
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Swiper: 'swiper'
        }),
        new HtmlWebpackPlugin({
            title:'慕思睡眠测试系统',
            filename: 'views/index.html',
            template: 'views/index.html',
            inject: true,
            minify: false,
            hash: false,
            chunks: ['index','vendor'],
            chunksSortMode: 'dependency',
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "js/commons.js",
            minChunks: 3,
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css'
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        })
    ]
};