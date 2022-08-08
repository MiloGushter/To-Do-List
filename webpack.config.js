const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { plugins } = require("../Restaurant-landing-page/webpack.config");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devtool: "inline-source-map",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "img/[hash][name][ext]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        type: "asset/resource",
        generator: {
          filename: "img/[hash][name][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      tilte: "To-do list",
      filename: "index.html",
    }),
  ],
};
