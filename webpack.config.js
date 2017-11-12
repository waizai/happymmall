/*
* @Author: dangxiaoli
* @Date:   2017-11-11 21:16:12
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2017-11-11 23:18:31
*/
const path = require('path');

var config = {
     entry: {
        'index' : ['./src/pages/index/index.js'],
        'login' : ['./src/pages/login/index.js']
     },
     output: {
         path: path.resolve(__dirname, './dist'),
         filename: 'js/[name].js'
     }
};


module.exports = config;
