const path = require("path");
const webpack = require('webpack');
require('dotenv').config({ path: './.env.local' });
module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[hash].[ext]",
            },
          },
        ],
      },
    ],
  },
  // 3. Den 'plugins'-Abschnitt hinzufügen
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_SITE_PASSWORD': JSON.stringify(process.env.REACT_APP_SITE_PASSWORD)
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    open: false,
    hot: true, //auto reload
    liveReload: false,
    /*proxy: [
      {
        context: ["/api"],
        target: "http://localhost:3000",
      },
    ],*/
  },
  performance: {
    //https://stackoverflow.com/questions/49348365/webpack-4-size-exceeds-the-recommended-limit-244-kib
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  cache: {
    //makes reload faster
    type: "filesystem",
  },
  devtool: "eval-source-map", // Nur für Entwicklung //makes reload faster
};
