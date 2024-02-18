// @ts-check

const { defineConfig } = require("@rspack/cli");
const { rspack, container } = require("@rspack/core");
const { ModuleFederationPlugin } = container;
const {
	NativeFederationTypeScriptHost,
	NativeFederationTypeScriptRemote,
} = require("@module-federation/native-federation-typescript");
const ReactRefreshPlugin = require("@rspack/plugin-react-refresh");
const path = require("path");

const config = defineConfig({
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
		port: 4001,
		static: path.resolve(__dirname, "dist"),
		open: false,
		historyApiFallback: {
			disableDotRule: true,
		},
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "*",
			"Access-Control-Allow-Headers": "*",
		},
	},
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif)$/i,
				type: "asset/resource",
			},
			{
				test: /^BUILD_ID$/,
				type: "asset/source",
			},
			{
				test: /\.css$/i,
				type: "css",
			},
			{
				test: /\.module\.css$/i,
				type: "css/module",
			},
			{
				test: /\.(j|t)s$/,
				exclude: [/[\\/]node_modules[\\/]/],
				loader: "builtin:swc-loader",
				options: {
					sourceMap: true,
					jsc: {
						parser: {
							syntax: "typescript",
						},
						externalHelpers: true,
						transform: {
							react: {
								runtime: "automatic",
								development: true,
								refresh: true,
							},
						},
					},
					env: {
						targets: "Chrome >= 48",
					},
				},
			},
			{
				test: /\.(j|t)sx$/,
				loader: "builtin:swc-loader",
				exclude: [/[\\/]node_modules[\\/]/],
				options: {
					sourceMap: true,
					jsc: {
						parser: {
							syntax: "typescript",
							tsx: true,
						},
						transform: {
							react: {
								runtime: "automatic",
								development: true,
								refresh: true,
							},
						},
						externalHelpers: true,
					},
					env: {
						targets: "Chrome >= 48", // browser compatibility
					},
				},
			},
		],
	},
	plugins: [
		new rspack.CopyRspackPlugin({
			patterns: [{ from: "public/assets", to: "assets" }],
		}),
		new rspack.HtmlRspackPlugin({
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
				"react-dom": { singleton: true, requiredVersion: "18.2.0" },
				"react-router-dom": {
					singleton: true,
					requiredVersion: "18.2.0",
				},
				"@heroicons/react": { singleton: true },
			},
		}),
		new ReactRefreshPlugin(),
		NativeFederationTypeScriptRemote.rspack({
			moduleFederationConfig: {
				name: "products",
				remotes: {
					host: "host@http://localhost:4000",
				},
				exposes: {
					"./ProductHero":
						"./src/features/Products/components/ProductHero.tsx",
				},
			},
		}),
		NativeFederationTypeScriptHost.rspack({
			moduleFederationConfig: {
				name: "products",
				remotes: {
					host: "host@http://localhost:4000",
				},
				exposes: {
					"./ProductHero":
						"./src/features/Products/components/ProductHero.tsx",
				},
			},
		}),
	],
});

module.exports = config;
