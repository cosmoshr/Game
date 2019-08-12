// Import dependencies
const CssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: config.SOURCEMAPS
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => [
              autoprefixer()
            ],
            sourceMap: 'inline'
          }
        }
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
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        {
          loader: CssExtractPlugin.loader,
          options: {
            hmr: process.env.NODE_ENV === 'development'
          }
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: config.SOURCEMAPS
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => [
              autoprefixer()
            ],
            sourceMap: 'inline'
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: config.SOURCEMAPS
          }
        }
      ]
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
  })
]

if (process.env.WEBPACK_ENV === 'electron-renderer') plugins.push(new CopyWebpackPlugin([{ from: 'electron.js' }]))
/**
 * Webpack configuration.
 */

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
