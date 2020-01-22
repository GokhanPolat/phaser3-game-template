const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const project = require('./src/project.json');

module.exports = {
  mode: 'production',
  devtool: 'none',
  target: 'web',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/' + '[name].[hash].bundle.min.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader'
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
  optimization: {
    minimizer: [new TerserPlugin({
      terserOptions: {
        ecma: undefined,
        warnings: false,
        parse: {},
        compress: {},
        mangle: true, // Note `mangle.properties` is `false` by default.
        module: false,
        output: {
          comments: false,
        },
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: true,
        safari10: true,
      },
    })],
  },
  performance: {
    // hints: false,
    maxEntrypointSize: 5120000,
    maxAssetSize: 5120000,
  },
};
