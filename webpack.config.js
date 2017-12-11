/*
* @Author: dangxiaoli
* @Date:   2017-11-11 21:16:12
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2017-12-11 17:50:08
*/
const path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量的配置，dev/online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV)


//获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name) {
    return {
        template : './src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
        title    : 'Hello waizai',
        inject   : true,
        hash     : true,
        chunks   : ['common',name]
    }
}

var config = {
     entry: {
        'common' : ['./src/pages/common/index.js'],
        'index'  : ['./src/pages/index/index.js'],
        'login'  : ['./src/pages/login/index.js']
     },
     /*
     * //__dirname表示当前文件模块所在的完整的绝对路径
     * //path.resolve方法用于将相对路径转为绝对路径
     * 下面的output.path相当于： 
     * cd __dirname
     * cd dist
     * pwd
     */
    /*
     *  publicPath指定了你在浏览器中用什么地址来引用你的静态文件，它会包括你的图片、脚本以及样式加载的地址，一般用于线上发布以及CDN部署的时候使用。
     *  静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径
     */
     output: {
         path     : path.resolve(__dirname, './dist'),              
         publicPath : '/dist/',
         filename : 'js/[name].js'
     },
     externals : {
     	jquery : 'window.jQuery'
     },
    module: {
        loaders: [
            {
                test  : /\.css$/,
                loader : ExtractTextPlugin.extract("style-loader","css-loader")
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, 
                loader: 'url-loader?limit=20000&name=resource/[name].[ext]'
            },
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


if(WEBPACK_ENV === 'dev'){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;
