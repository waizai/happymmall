/*
* @Author: dangxiaoli
* @Date:   2017-11-11 21:16:12
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2017-12-12 14:02:28
*/
const path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量的配置，dev/online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV)


//获取html-webpack-plugin参数的方法
/*  自动生成html文件的插件:HtmlWebpackPlugin
 *  插件会自动生成html文件并将打包好的js插入文件
 *  chunks属性 : 将数组中所有片段完成打包，并用script标签将打包的js插入到生成的页面中，没有在数组中的片段，则不插入页面
 *  template : html文件的模板,根据已有的html文件生成html文件
 *
 *  html-webpack-plugin原生支持ejs模板
 */
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
         // path     : path.resolve(__dirname, './dist'),
         path     : './dist',              
         publicPath : '/dist',
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
/*
 *   你启动webpack-dev-server后，你在目标文件夹中是看不到编译后的文件的,实时编译后的文件都保存到了内存当中。
 *   因此很多同学使用webpack-dev-server进行开发的时候都看不到编译后的文件
 *   有2种方式启动webpack-dev-server
 *       1. cmd line
 *       2. Node.js API -- 通过npm script进行启动
 **/

module.exports = config;
