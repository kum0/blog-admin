const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const constants = require('./constants');
const config = require('./config');
const { assetsPath } = require('./utils');

const basePlugins = [
  // new webpack.DefinePlugin(defineEnv),
  // new MomentLocalesPlugin({
  //     localesToKeep: ['es-us', 'zh-cn']
  // })
];

const devPlugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'public/index.html',
    inject: true
  })
];

const prodPlugins = [
  new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
  new HtmlWebpackPlugin({
    filename: config.index,
    template: 'public/index.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: assetsPath('css/[name].[hash].css'),
    chunkFilename: assetsPath('css/[name].[id].[hash].css')
  })
];

if (config.bundleAnalyzerReport) {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  prodPlugins.push(new BundleAnalyzerPlugin());
}

module.exports = basePlugins.concat(constants.APP_ENV === 'dev' ? devPlugins : prodPlugins);