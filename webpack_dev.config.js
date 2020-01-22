const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const project = require('./src/project.json');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  // devtool: 'none',
  target: 'web',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/' + '[name].[hash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
          name: '[folder]/[name].[contenthash].[ext]',
        },
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, 'dist')
    }),
    new webpack.DefinePlugin({
      "typeof CANVAS_RENDERER": JSON.stringify(true),
      "typeof WEBGL_RENDERER": JSON.stringify(true),
      "typeof EXPERIMENTAL": JSON.stringify(true),
      // Disable Facebook PLUGIN and CAMERA3D
      // "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
      // "typeof PLUGIN_FBINSTANT": JSON.stringify(false),
    }),
    new HtmlWebpackPlugin({
      template: './src/index-template.html'
    }),
    new CopyPlugin([
      { from: 'src/css/', to: 'css/' },
      { from: 'src/favicon.ico', to: '' },
      //   { from: 'src/project.json', to: 'project.json' },
    ]),
    new OpenBrowserPlugin({ url: 'https://'+ project.devhost + ':' + project.devport })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    host: project.devhost,
    port: project.devport,
    open: false, // we are open url with OpenBrowserPlugin
    hot: true,
    overlay: true,
    https: true,
  },
};
