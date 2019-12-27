const path = require("path")
const HTMLWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: ["@babel/polyfill","./src/index.js"],
  output: {
    path: path.resolve(__dirname,"build"),
    filename: "main.js",
    publicPath: '/'
  },
  devServer: {
    contentBase: path.resolve(__dirname,"build"),
    compress: true,
    port: 3000,
    historyApiFallback: true,
    proxy: {
      "/api": {
      target: "http://localhost:3001",
      pathRewrite: {"^/api" : "/api"} 
      }
    }
  },
  devtool: "source-map",
  module:{
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env","@babel/preset-react"]
        }
      },
      {
        test:/\.css$/,
        loaders:["style-loader","css-loader"]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './build/index.html',
      filename: 'index.html'
  })
  ]
}

module.exports = config