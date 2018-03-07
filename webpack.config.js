const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

// var env = process.env.WEBPACK_ENV;
// console.log(env);

module.exports = {
  entry: ["babel-polyfill", __dirname + "/src/app/index.js"], // webpack entry point. Module to start building dependency graph
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'), // Folder to store generated bundle
    filename: 'index_bundle.js'  // Name of generated bundle after build
    // publicPath: '/'
  },
  module: {  // where we defined file patterns and their loaders
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: [
            /node_modules/
          ]
        },
        {
            test: /\.(sass|scss)$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                { loader: 'css-loader'},
                { loader: 'sass-loader'}
              ],
            })
        },
        {
          test:/\.(ttf|woff|woff2)$/,
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]"
          }
        },

        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [  // Array of plugins to apply to build chunk
      new HtmlWebpackPlugin({
        title: 'Kyle Peterson',
        template: __dirname + "/src/public/index.html",
        inject: 'body'
        // hash:true
      }),
      new ExtractTextPlugin("styles_bundle.css"), // extract css to a separate file called styles.css
      new WriteFilePlugin(),
      new CopyWebpackPlugin([
        { from: 'src/php', to: 'php' }
      ])

  ],
  devServer: {  // configuration for webpack-dev-server
      contentBase: './src/public',  //source of static assets
      port: 3000, // port to run dev-server
  }
};
