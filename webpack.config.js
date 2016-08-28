var Path=require('path');
var OpenBrowserPlugin=require('open-browser-webpack-plugin');
var node_modules=Path.resolve(__dirname, 'node_modules');

var config={
	entry: {
		main:[
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://localhost:8888',
			Path.resolve(__dirname,'./js/app.js')
	    ],
		other: Path.resolve(__dirname,'./js/other.js')
	},
	resolve: {
		extentions: ['','.js','.jsx']
	},
	output: {
		path: Path.resolve(__dirname,'./'),
		filename: '[name].js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel',
			exculde: /node_modules/,
			query: {
				presets: ['react','es2015']
			}
		},{
			test: /\.css$/,
			loader: 'style!css'
		},{
			test: /\.scss$/,
			loader: 'style!css!sass'
		},{
			test: /\.(png|jpg|gif|eot|svg|ttf|woff)\??.*$/,
			loader: 'url?limit=25000&name=[path][name].[ext]'
		},]
	},
	plugins: [
		new OpenBrowserPlugin({url: 'http://localhost:8888'})
	]
};

module.exports=config;

