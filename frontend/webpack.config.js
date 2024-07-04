const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => {
    return {
        devServer: {
            port: 3000
            // open: false,
            // historyApiFallback: true,
            // hot: true
        },
        entry: path.resolve(__dirname, "src", "index.tsx"),
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "[name].[hash].bundle.js",
            clean: true
            // publicPath: "/"
        },
        resolve: {
            extensions: [".tsx", ".ts", ".jsx", ".js"]
        },
        module: {
            rules: [
                {
                    test: /\.(tsx|ts)$/,
                    loader: "ts-loader"
                },
                {
                    test: /\.css$/,
                    loader: "css-loader"
                }
            ]
        },

        plugins: [
            new Dotenv({ path: env.envFile || "" }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "src", "index.html")
            })
        ]
    };
};
