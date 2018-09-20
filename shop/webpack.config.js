'use strict';
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//提取公共模块
const webpack = require('webpack');
//压缩混淆
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {

	//入口
	entry: {
		main: './src/main.js',
		//		vendors: ['vue', 'vue-router', 'moment', 'axios', 'vue-preview']

	},
	output: {
		//所有产出资源路径
		path: path.join(__dirname, 'dist'),
		//设置资源路径的请求地址
		//		publicPath: "/public/",
		filename: 'js/[name].[hash:6].js'
	},
	module: {
		rules: [{
				test: /\.css$/,
				loader: 'style-loader!css-loader!autoprefixer-loader',
				//提取css
				//				use: ExtractTextPlugin.extract({
				//					fallback: "style-loader",
				//					use: "css-loader!autoprefixer-loader"
				//				})
			},
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
			},
			{
				test: /\.(jpg|png|svg|ttf|woff|woff2|gif|eot)$/,
				loader: 'url-loader',
				options: {
					limit: 4096, //4096字节以上生成文件，否则base6
					name: 'assets/[name].[ext]',
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			// 解析vue-preview的es6代码
			{
				test: /vue-preview.src.*?js$/,
				loader: 'babel-loader',
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			}, {
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	},
	plugins: [
		//压缩混淆代码
		//		new UglifyJSPlugin(),
		new htmlWebpackPlugin({
			template: './src/index.html'
		}),
		//		new webpack.optimize.CommonsChunkPlugin({
		//			//manifest 清单，用来记录使用者和第三方包的依赖关系
		//			names: ['vendors', 'manifest']
		//		}),
		//提取css插件
		//		new ExtractTextPlugin("css/[name].[contenthash:6].css")
	],
	//配置跨域代理
	devServer: {
		proxy: {
			"/my": {
				target: "http://localhost:5000",
				//默认代理是自己,请求devserver的服务器去了
				changeOrigin: true,
				pathRewrite: {
					'^/my': ''
				}
			}

		}

	}
}