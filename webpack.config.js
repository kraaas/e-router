const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'e-router.js',
    library: 'ERouter',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-3'],
        plugins: ["transform-object-assign", "transform-class-properties", "add-module-exports"]
      },
      exclude: /node_modules/,
      include: __dirname
    }]
  }
}
