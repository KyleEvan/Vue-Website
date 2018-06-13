const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin
const { VueLoaderPlugin } = require('vue-loader');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

// var env = process.env.WEBPACK_ENV;
// console.log(env);

module.exports = {
  mode: 'development',
  entry: ["babel-polyfill", __dirname + "/src/app/index.js"], // webpack entry point. Module to start building dependency graph
  devtool: 'inline-source-map',
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
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            // "style-loader",
            "css-loader",
            "sass-loader"
          ]
        },
        // {
        //     test: /\.(sass|scss)$/,
        //     use: ExtractTextPlugin.extract({
        //       fallback: 'style-loader',
        //       use: [
        //         { loader: 'css-loader' },
        //         { loader: 'sass-loader' }
        //       ],
        //     })
        // },
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [  // Array of plugins to apply to build chunk
      new HtmlWebpackPlugin({
        // title: 'Kyle Peterson',
        template: __dirname + "/src/public/index.html",
        inject: 'body'
        // hash:true
      }),
      new MiniCssExtractPlugin({
        filename: "[name]_bundle.css",
      }),
      new VueLoaderPlugin()
      // new ExtractTextPlugin("styles_bundle.css"), // extract css to a separate file called styles.css
      // new CopyWebpackPlugin([
      //   { from: 'src/php' }
      // ])

  ],
  devServer: {  // configuration for webpack-dev-server
      contentBase: './src/public',  //source of static assets
      historyApiFallback: true,
      port: 3000, // port to run dev-server
      watchOptions: {
        aggregateTimeout: 300,
        poll: true
      }
  }
};
