var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    'vue-pull-to-refresh': './src/components/index.js'
  },

  output: {
    filename: './dist/[name].js',
    library: 'VuePullToRefresh',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {test: /\.vue$/, loader: 'vue'},
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
    ]
  },

  babel: {
      presets: ['es2015', 'stage-0'],
      plugins: ['transform-runtime']
  }
}