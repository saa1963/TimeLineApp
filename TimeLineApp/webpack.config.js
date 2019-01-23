const path = require('path');
 
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
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'wwwroot/dist')
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
  }
};