const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: {
		app: "./src/index.tsx",
	},
	output: {
		publicPath: "auto",
		filename: "[name].[contenthash:8].js",
		chunkFilename: "[name].[contenthash:8].chunk.js",
		assetModuleFilename: "[name].[hash][ext][query]",
	},
	mode: "development",
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
	},
	devServer: {
		port: 3000,
		historyApiFallback: true,
		open: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "*",
			"Access-Control-Allow-Headers": "*",
		},
	},
	module: {
		rules: [
			{
				test: /(?<!\.module)\.(css|s[ac]ss)$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.module.(css|s[ac]ss)$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							modules: {
								localIdentName:
									"[path][name]__[local]--[hash:base64:5]",
								exportLocalsConvention: "camelCase",
							},
						},
					},
				],
			},
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash:8].css",
		}),
		new HtmlWebPackPlugin({
			template: "./src/index.html",
		}),
	],
};
