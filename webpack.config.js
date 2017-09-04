const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {

  const production = env === 'production';
  const development = env === 'development';

  return {
    context: resolve('./src'),
    entry: './js/index.js',
    output: {
      path: resolve('./dist/'),
      filename: 'js/bundle.js',
      publicPath: '/'
    },
    module: {
      loaders: [
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.html$/, loader: 'html-loader' },
        { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
        { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          loader: 'file-loader?name=img/[name].[ext]'
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({ template: './index.html' }),
      new CopyWebpackPlugin([
        { from: './manifest.json' },
        { from: './manifest.webapp' },
        { from: './robots.txt' },
        { from: './images/**/*', to: './' }
      ])
    ]
  }
};
