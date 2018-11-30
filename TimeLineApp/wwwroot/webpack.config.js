const path = require('path');
const process = require('process')
 
//module.exports = {
//  entry: './src/index.js',
//  devtool: 'eval-source-map',
//  devServer: {
//    contentBase: './dist'
//  },
//  output: {
//    filename: 'main.js',
//    path: path.resolve(__dirname, 'dist')
//  },
//  resolve: {
//    modules: [ 'node_modules' ]
//  }
//};
module.exports = {
  entry: './src/index.ts',
  devtool: 'source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    modules: ['node_modules'],
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  resolveLoader: {
    modules: ['C:/Users/soshin.OPER/AppData/Roaming/npm/node_modules'],
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main']
  }
};