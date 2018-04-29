
const path = require("path")
const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: [
    "./frontend/entry.ts",
  ],
  output: {
    path: path.resolve(__dirname, "public/static"),
    filename: "entry.bundle.js"
  },
  externals: {
    "pixi.js": "PIXI",
    "lodash": "_",
  },
  resolve: {
    alias: {
      "@": __dirname,
    },
    modules: [
      path.resolve(__dirname, "src"),
      path.resolve(__dirname, "static"),
      path.resolve(__dirname, "node_modules"),
    ],
    extensions: [".css", ".js"],
  },
  module: {
    rules: [
      // {
      //   test: /\.(jpe?g|png|gif)$/i,
      //   use: "file-loader",
      //   query: {
      //     name: "[path][name].[ext]?[hash]",
      //     publicPath: "/static/", // prefix
      //   }
      // },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader?importLoaders=1",
        }),
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract(["css-loader", "sass-loader", ]),
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        use: "awesome-typescript-loader"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "entry.bundle.css",
      allChunks: true,
    }),
    new CopyWebpackPlugin([
      {
        from: "node_modules/pixi.js/dist/pixi.min.js",
        to: "vendor/pixi.min.js",
      },
      {
        from: "node_modules/lodash/lodash.min.js",
        to: "vendor/lodash.min.js",
      },
      {
        from: "static",
        to: ".",
      },
    ]),
    new HtmlWebpackPlugin({
      template: "assets/layout/index.html",
      filename: "../index.html",
    }),
  ],
  devtool: "#source-map",
}
