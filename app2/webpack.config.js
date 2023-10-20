const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { FederatedTypesPlugin } = require("@module-federation/typescript");
const path = require("path");

const config = {
	entry: {
		app: "./src/index.tsx",
	},
	output: {
		publicPath: "auto",
		filename: "[name].[contenthash:8].js",
		chunkFilename: "[name].[contenthash:8].chunk.js",
		assetModuleFilename: "[name].[hash][ext][query]",
		clean: true,
	},
	mode: "development",
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
	},
	devServer: {
		port: 3001,
		historyApiFallback: {
			disableDotRule: false,
		},
		static: path.resolve(__dirname, "dist"),
		open: false,
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
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.module.(css|s[ac]ss)$/i,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: {
								localIdentName:
									"[name]__[local]--[hash:base64:5]",
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
		new CopyPlugin({
			patterns: [{ from: "public/assets", to: "assets" }],
		}),
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash:8].css",
		}),
		new HtmlWebPackPlugin({
			template: "./public/index.html",
		}),
		new ModuleFederationPlugin({
			name: "products",
			filename: "remoteEntry.js",
			exposes: {
				"./ProductHero":
					"./src/features/Products/components/ProductHero.tsx",
			},
			shared: {
				react: { singleton: true, requiredVersion: "18.2.0" },
			},
		}),
		new FederatedTypesPlugin({
			federationConfig: {
				name: "products",
				remotes: {
					host: "host@http://localhost:10000",
				},
				exposes: {
					"./ProductHero":
						"./src/features/Products/components/ProductHero.tsx",
				},
			},
			typeServeOptions: {
				host: "localhost",
				port: 10001,
			},
		}),
	],
};

config.infrastructureLogging = {
	level: "verbose",
	colors: true,
};

module.exports = config;
