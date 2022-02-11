const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: 'development',
  output: {
    publicPath: "http://localhost:8080/",
    uniqueName: "shell",
  },
  optimization: {
    runtimeChunk: false,
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
        index: '/index.html'
    }
  },
  plugins: [ 
       
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'sb.html'
    }),
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        searchbar: 'searchbar@http://localhost:8083/remoteEntry.js',
      },
      shared: {
        "@angular/core": { eager: true, singleton: true },
        "@angular/common": { eager: true, singleton: true },
        "@angular/router": { eager: true, singleton: true },
      },
    }),
  ],
};
