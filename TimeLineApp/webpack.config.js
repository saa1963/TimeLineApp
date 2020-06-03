const path = require('path');
const webpack = require('webpack')
//const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './index0.ts',
  },
  devtool: 'source-map',
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'wwwroot/dist'),
    devtoolModuleFilenameTemplate: '../../src/[resource-path]'  // Removes the webpack:/// prefix
  },
  resolve: {
    modules: ['node_modules'],
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      jquery: "jquery/src/jquery",
      'jquery-contextmenu': "jquery-contextmenu/src/jquery.contextmenu"
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": "jquery"
    })
  ]
};