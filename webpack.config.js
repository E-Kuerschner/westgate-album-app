const webpack = require("webpack");
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const PUBLIC_PATH = "/";

let plugins = [
    new CopyPlugin([
        { from: "./css", to: "./css" }
    ]),
    new HTMLWebpackPlugin({
        template: "index-template.ejs",
        filename: "index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
];

module.exports = {
    target: "web",
    mode: process.env.NODE_ENV || "development",
    entry: "./src/app.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: PUBLIC_PATH
    },
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"],
                exclude: ["node_modules"]
            },
            {
                test:   /\.(png|gif|jpg|jpeg)$/,
                exclude: ["node_modules"],
                use: [{
                    loader: "url-loader",
                    query: "name=images/[name].[ext]&limit=10000"
                }]
            }
        ]
    },
    devServer: {
        hot: true,
        port: 8080,
        host: "localhost",
        publicPath: PUBLIC_PATH
    }
}