const path = require('path');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  devtool: 'source-map',
  context: path.resolve(__dirname, 'wwwroot'),
  mode: 'development',
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
      //{
      //  test: /\.scss$/,
      //  use: [{
      //      loader: "style-loader"
      //  }, {
      //      loader: "css-loader"
      //  }, {
      //      loader: "sass-loader",
      //      options: {
      //          includePaths: ["scss/bootstrap", "scss/fontawesome"]
      //      }
      //  }]
      //  },
      //  {
      //    test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
      //    use: ['file-loader']
      //  }
    ]
  }
};