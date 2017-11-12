/*
* @Author: dangxiaoli
* @Date:   2017-11-11 21:16:12
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2017-11-12 23:16:22
*/
const path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name) {
    return {
        template : './src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
        title: 'Hello waizai',
        inject : true,
        hash : true,
        chunks : ['common',name]
    }
}

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
            {test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader","css-loader")}
        ]
    },
     plugins : [
        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
        //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        //把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
     ]
};


module.exports = config;
