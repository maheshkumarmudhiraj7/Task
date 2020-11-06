const webpack = require('webpack'); //to access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const path = require('path');
//"start":"webpack-dev-server --open --mode development --config webpack.config.js",

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    //contentBase: path.join(__dirname, 'src'),
    compress: true,
    //port: 8080
  },
  module: {
    rules: [
      {
      	test: /\.scss$/i, 
      	use: ['css-loader','sass-loader','style-loader']
      },
      {
          test: /\.json$/,
          type: "javascript/auto",
          loader: "file-loader",
          options: { name: "assets/[name].[ext]" },
          include: [
              path.resolve(__dirname, "../src/assets"),
          ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};