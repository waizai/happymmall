/*
* @Author: dangxiaoli
* @Date:   2017-11-11 21:16:12
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2017-11-12 17:36:37
*/
const path = require('path');
var webpack = require('webpack');

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
     plugins : [
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        })
     ]
};


module.exports = config;
