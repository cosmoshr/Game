// Import dependencies
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackCommon = require('./webpack.common')

// Import Configuration
const config = require('../config')

/**
 * Set output folder name for .js file for the production build.
 */
const output = {
  path: config.DIST,
  filename: config.JSFILENAME,
  publicPath: './'
}

/**
 * Plugins for production build.
 *
 * CopyWebpackPlugin()
 * A webpack plugin that copies individual files or entire directories to the build directory.
 *
 * UglifyJsPlugin()
 * A webpack plugin to minify your JavaScript.
 *
 * LoaderOptionsPlugin()
 * A webpack plugin to edit loader options.
 */
const plugins = [
  // new CopyPlugin({
  //   patterns: [
  //     {
  //       from: `${config.OUTPUT}/favicon.ico`
  //     },
  //     {
  //       from: `${config.OUTPUT}/assets/`,
  //       to: `${config.DIST}/assets/`
  //     }
  //   ]
  // })
  // ,
  // new webpack.LoaderOptionsPlugin({
  //   minimize: true
  // })
]

const optimization = {
  minimize: true,
  minimizer: [new TerserPlugin()]
}

/**
 * Webpack configuration.
 */
const WebpackConfig = {
  optimization,
  output,
  plugins
}

// Merge and export WebpackConfig module
module.exports = merge(WebpackCommon, WebpackConfig)
