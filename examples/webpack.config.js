
var path = require('path')
var webpack = require('webpack')
var precss = require('precss')
var autoprefixer = require('autoprefixer')

module.exports = {

  devtool: 'inline-source-map',

  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, 'main.js')
  ],

  output: {
    path: __dirname + '/__build__/',
    publicPath: '/__build__/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.vue$/, loader: 'vue'},
      { test: /\.less$/, loader: 'style-loader!css-loader!postcss-loader' },
      { test: /\.(png|jpg|gif)$/, loader: 'file?name=[name].[ext]?[hash]' }
    ]
  },

  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  },

  postcss: function() {
    return [precss, autoprefixer]
  },

  resolve: {
    alias: {
      'carbonui': path.join(__dirname, '..', 'components')
    }
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

}
