const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
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
  devServer: {  // configuration for webpack-dev-server
      contentBase: './src/public',  //source of static assets
      historyApiFallback: true,
      port: 3000, // port to run dev-server
      watchOptions: {
        aggregateTimeout: 300,
        poll: true
      }
  },
  plugins: [  // Array of plugins to apply to build chunk
      new HtmlWebpackPlugin({
        template: __dirname + "/src/public/index.html",
        inject: 'body',
        hash: true
      }),
  ]
});
