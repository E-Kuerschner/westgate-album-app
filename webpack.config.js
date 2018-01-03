const webpack = require("webpack");
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const PUBLIC_PATH = "/";

let plugins = [];
if (process.env.NODE_ENV === "production") {
    plugins = [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            beautify: true,
            compress: {
                warnings: false,
                drop_console: true
            },
            comments: false
        })
    ];
} else {
    plugins = [
        new HTMLWebpackPlugin({
            template: "index-template.ejs",
            filename: "../index.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ];
}

module.exports = {
    devtool: "eval",
    entry: "./src/app.js",
    output: {
        path: path.join(__dirname, "public", "javascripts"),
        filename: "bundle.js",
        publicPath: PUBLIC_PATH
    },
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: ["node_modules"],
                use: ["babel-loader"]
            },
            {
                test:   /\.(png|gif|jpg|jpeg)$/,
                exclude: ["node_modules"],
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: "../images/[name].[ext]"
                    }
                }]
            }
        ]
    },
    devServer: {
        hot: true,
        port: 8080,
        host: "localhost",
        publicPath: PUBLIC_PATH,
        contentBase: path.join(__dirname, "public")
    }
}