/*
* @Author: dangxiaoli
* @Date:   2017-11-11 21:16:12
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2017-11-12 18:21:39
*/
const path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


var config = {
     entry: {
        'common' : ['./src/pages/common/index.js'],
        'index' : ['./src/pages/index/index.js'],
        'login' : ['./src/pages/login/index.js']
     },
     output: {
         path: path.resolve(__dirname, './dist'),
         filename: 'js/[name].js'
     },
     externals : {
     	jquery : 'window.jQuery'
     },
    module: {
        loaders: [
          // 编译css并自动添加css前缀
            { 
                test: /\.css$/, 
                loader: ExtractTextPlugin.extract("style-loader","css-loader")
            }
        ]
    },
     plugins : [
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        new ExtractTextPlugin("css/[name].css"),
     ]
};


module.exports = config;
