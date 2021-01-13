const path = require("path");
const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  target: "web",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
      chunkFilename: '[id].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin({
        overrideConfigFile: path.resolve(__dirname, '.eslintrc.json'),
        context: path.resolve(__dirname, 'src'),
        files: ['**/*.js',"**/*.jsx"],
        extensions: [".js", ".jsx"]
    }),
  ],
  devServer: {
    index: "index.html",
    contentBase: path.resolve(__dirname, "./dist"),
    historyApiFallback: true,
    hot: true,
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        exclude: /node_modules/,
        use: [
            {loader: MiniCssExtractPlugin.loader},
            {
                loader: "css-loader",
                options: {importLoaders: 1, sourceMap: true},
            },
            {loader: "sass-loader", options: {sourceMap: true}},
        ],
      }
    ],
  },
  optimization: {
    runtimeChunk: true,
  },
});
