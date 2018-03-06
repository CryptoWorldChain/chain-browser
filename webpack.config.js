const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
var BowerWebpackPlugin = require("bower-webpack-plugin");
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');



module.exports = {
  //devtool: 'eval-source-map',
  devtool: 'source-map',
  entry:  __dirname + "/src/index.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  
        

  module: {

    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          'plugins': ['recharts','lodash'],
          presets: ['es2015','react','stage-0']
        }
      }
    ]
  },

  devServer: {
    contentBase: "./public",
    colors: true,
    historyApiFallback: true,
    inline: true
  },
  plugins: [
     new webpack.LoaderOptionsPlugin({
        alias: {
       'react': 'preact-compat',
       'react-dom': 'preact-compat'
        }}),
     
  new UglifyJSPlugin({comments: false, // remove comments
      compress: {
        unused: true,
        dead_code: true, // big one--strip code that will never execute
        warnings: false, // good for prod apps so users can't peek behind curtain
        drop_debugger: true,

        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,

        conditionals: true,
        evaluate: true,
        drop_console: false, // strips console statements
        sequences: true,
        booleans: true,
      },
      output: {
        comments: false,
      },sourceMap: false,
      minimize: true
    }),


    // new LodashModuleReplacementPlugin,

    new ExtractTextPlugin("bundle.css"),
    // new BowerWebpackPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.SourceMapDevToolPlugin(__dirname + "/public/bundle.js.map"),
    // new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    // new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]), 
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      //threshold: 10240,
      minRatio: 0.8
    })
  ]
}
