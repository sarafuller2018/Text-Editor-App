// Import required files and packages 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Sets up our build? 
module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      header: "./src/js/header.js",
      editor: "./src/js/editor.js"
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        // No manual script in index b/c this will put it in automatically
        template: "./index.html",
        title: "Webpack Plugin"
      }),
      // Add and configure workbox plugins for a service worker and manifest file.
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "service-worker.js"
      }),
      new WebpackPwaManifest({
        name: "Text-Editor-App",
        short_name: "TEA",
        description: "App that allows on and offline text editing",
        background_color: "#ffffff",
        crossorigin: "use-credentials",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512], // Multiple image sizes
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],
    module: {
      rules: [
        // Add CSS loaders and babel to webpack.
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        // Babel loader takes from es6 to es5
        {
          test: /\.m?js$/,
          // Excludes anything in these folders
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        },
      ],
    },
  };
};
