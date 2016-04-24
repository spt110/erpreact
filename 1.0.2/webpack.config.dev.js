var path = require('path');
var webpack = require('webpack');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client', 
    './src/js/app.jsx',
    './src/less/style.less'
  ],
  output: {
    path: path.join(__dirname, 'src'),
    filename: 'js/app.js',
    publicPath: '/'
  },
  externals: {'react': 'React', 'react-dom': 'ReactDOM'},
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve : {
      extensions: ['', '.js', '.jsx'],
    alias: {} 
},
  module: {
  loaders: [
                    {test: /\.(css)$/, loader: 'style-loader!css-loader?localIdentName=[hash:base64:8]' },

                {test: /\.(less)$/, loader: 'style-loader!css-loader?localIdentName=[hash:base64:8]!less-loader' },
                {test: /\.scss$/,loader: 'style!css!sass'},
                {test: /\.js$/,loaders: ['babel-loader'],include: [
                                        path.resolve(__dirname, 'src'), 
                                        path.resolve(__dirname, 'node_modules/rctui')
                                    ]}, 
                {test: /\.json$/, loader: 'file-loader?name=./json/[name].json' },
                {test: /\.(ttf|eot|woff|woff2|otf|svg)/, loader: 'file-loader?name=./font/[name].[ext]' },
                {test:/\.(png|jpg|jpeg|svg)/,loader:'url?limit=25000&name=images/[name].[ext]'},
                //{test: /\.(png|jpg|jpeg)$/,loader: 'url?limit=25000'}, //url  url-loader 传   limit 参数不超高25k自动转 BASE64字符串
                {test: /\.jsx?$/,loader:'babel-loader',exclude: /node_modules/,query:{presets:['react','es2015','react-hmre']}}
        
    ]
  }
};
