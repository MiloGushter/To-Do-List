const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	mode: "development",
	devtool: "inline-source-map",
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
		assetModuleFilename: "resources/[hash][name][ext]",
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/,
				type: "asset/resource",
				generator: {
					filename: "resources/[name]-[hash][ext]",
				},
			},
			{
				test: /\.html$/i,
				use: "html-loader",
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			tilte: "To-do-list",
			template: "./src/index.html",
			favicon: "./src/resources/icons/favicon.ico",
			filename: "index.html",
		}),
	],
};
