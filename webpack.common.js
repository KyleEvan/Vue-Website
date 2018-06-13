const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');


module.exports = {
  entry: ["babel-polyfill", __dirname + "/src/app/index.js"], // webpack entry point. Module to start building dependency graph
  output: {
    path: path.resolve(__dirname, 'dist'), // Folder to store generated bundle
    filename: 'index_bundle.js'  // Name of generated bundle after build
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
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        },
        {
          test:/\.(ttf|woff|woff2)$/,
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]"
          }
        },
        {
          // test:/\.(jpg|png|gif|svg|ico)$/,
          test: /\.(svg|png|jpg|gif)$/,
          loader: "file-loader",
          options: {
            name: "images/[name]-[hash].[ext]"
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
    new MiniCssExtractPlugin({
      filename: "[name]_bundle.css",
    }),
    new VueLoaderPlugin()
    
  ],
};
