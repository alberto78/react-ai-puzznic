const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './game/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true, 
      template: './game/index.html'
    })
  ]
}