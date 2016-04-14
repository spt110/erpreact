
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack=require('webpack');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'src/templates');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var deps = [
  'react/dist/react.min.js'
  ,'react-dom/dist/react-dom.min.js'
];
var config = {
      devtool: 'inline-source-map',
    //devtool: 'eval',
   // devtool: 'cheap-module-eval-source-map'
  //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
 entry: {
    app: path.resolve(APP_PATH, 'js/app.jsx'),
    //添加要打包在vendors里面的库
    vendors: ['react','react-dom']
    },
  //输出的文件名 合并以后的js会命名为bundle.js
  output: {
    path: BUILD_PATH,
    //filename: 'bundle.js'
     //注意 我们修改了bundle.js 用一个数组[name]来代替，他会根据entry的入口文件名称生成多个js文件，这里就是(app.js,mobile.js和vendors.js)
   //只要再加上hash这个参数就可以了
        filename: '[name].[hash].js'
        
        },
 resolve : {
      extensions: ['', '.js', '.jsx'],
    alias: {} 
},
  module: {
        noParse: [],
   perLoaders: [ {test: /\.jsx?$/,include: APP_PATH, loader: 'jshint-loader' }],
   loaders: [
                {test: /\.(css|less)$/, loader: 'style-loader!css-loader?localIdentName=[hash:base64:8]!less-loader' },
                {test: /\.scss$/,loader: 'style!css!sass'},
                {test: /\.js$/,loaders: ['babel-loader'],include: [
                                        path.resolve(__dirname, 'src'), 
                                        path.resolve(__dirname, 'node_modules/rctui')
                                    ] }, 
                {test: /\.json$/, loader: 'file-loader?name=./json/[name].json' },
                {test: /\.(ttf|eot|woff|woff2|otf|svg)/, loader: 'file-loader?name=./font/[name].[ext]' },
                {test: /\.(png|jpg|jpeg)$/,loader: 'url?limit=25000'}, //url  url-loader 传   limit 参数不超高25k自动转 BASE64字符串
                {test: /\.jsx?$/,loader:'babel-loader',exclude: /node_modules/,query:{presets:['react','es2015']}},
                {test: path.resolve(node_modules_dir, deps[0]),loader: "expose?React"}   //使用暴漏全局加载器来暴露压缩版的React JS,
    ]
  },
   externals: {'react': 'React', 'react-dom': 'ReactDOM'},
  //添加我们的插件 会自动生成一个html文件
  plugins: [
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    //   "window.jQuery": "jquery"
    //  }),
    // new webpack.DefinePlugin({//添加此块代码
    //     'process.env.NODE_ENV': JSON.stringify('production')
    // }),
    //这个使用uglifyJs压缩你的js代码
   // new webpack.optimize.UglifyJsPlugin({minimize: true}),
    //把入口文件里面的数组打包成verdors.js
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new HtmlwebpackPlugin({
    title: 'Hello World app',
    template: path.resolve(TEM_PATH, 'index.html'),
    filename: 'index.html',
    //chunks这个参数告诉插件要引用entry里面的哪几个入口
    chunks: ['vendors','app'],
    //要把script插入到标签里
    inject: 'body'
  })
  ]
};
deps.forEach(function (dep) {
  var depPath = path.resolve(node_modules_dir, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});
module.exports=config;