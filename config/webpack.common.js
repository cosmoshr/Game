// Import dependencies
const CssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const WebpackBar = require('webpackbar')

// Import Configuration
const config = require('../config')

/**
 * Entry point for the bundle.
 */
const entry = [
  'babel-polyfill',
  config.ENTRY
]

/**
 * Array of resolve modules entry and file extension to prevent ESLint errors.
 */
const resolve = {
  modules: [config.ENTRY, 'node_modules'],
  extensions: ['*', '.js', '.json']
}

/**
 * Default modules loaders.
 */
const modules = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader?cacheDirectory'
        }
      ]
    },
    { test: /\.tsx?$/, loader: 'ts-loader' },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        'to-string-loader',
        'css-loader'
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf|svg|ico|jpg|jpeg|png)$/,
      loader: 'url-loader',
      options: {
        limit: 1000000
      }
    },
    {
      test: /\.html$/,
      exclude: /node_modules/,
      loader: 'raw-loader'
    },
    {
      test: /\.worker\.js$/,
      use: { loader: 'worker-loader' }
    }
  ]
}

/**
 * Shared plugins.
 *
 * CleanWebpackPlugin()
 * A webpack plugin to remove/clean your build folder(s) before building.
 *
 * CssExtractPlugin()
 * A webpack plugin to extract text from a bundle, or bundles, into a separate file.
 *
 * HtmlWebpackPlugin()
 * A webpack plugin that simplifies creation of HTML files to serve your webpack bundles.
 */
const plugins = [
  new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: ['!public']
  }),
  new CssExtractPlugin({
    filename: config.CSSFILENAME,
    chunkFilename: '[id].css'
  }),
  new HtmlWebpackPlugin({
    template: `${config.OUTPUT}/index.html`
  }),
  new WebpackBar()
]

if (process.env.WEBPACK_ENV === 'electron-renderer') plugins.push(new CopyWebpackPlugin([{ from: 'electron.js' }]))

const optimization = {
  splitChunks: {
    chunks: 'all',
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    automaticNameMaxLength: 30,
    name: true,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }
  },
  usedExports: true
}

/**
 * Webpack configuration.
 */
const WebpackConfig = {
  target: process.env.WEBPACK_ENV || 'web',
  entry,
  resolve,
  module: modules,
  plugins,
  optimization
}
// Export WebpackConfig module
module.exports = WebpackConfig
