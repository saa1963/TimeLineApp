const path = require('path');
 
module.exports = {
  entry: './src/index.js',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    modules: [ 'node_modules' ]
  }
};