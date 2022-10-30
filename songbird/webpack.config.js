// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: {
    index: path.resolve(__dirname, './src/index.js'), // одна входная точка, единый js файл для всех (в твоем случае для двух) страниц!!!!
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, 'index.html'), // шаблон
        filename: 'index.html', // название выходного файла
        chunks: ['index'] // здесь от названия страницы, ты добавляешь именно тот js файл, который должен быть к ней привязан можно привязать через js
    }),
   ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
       {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                [
                  require("postcss-preset-env"),
                  {
                    // Options
                  },
                ],
              ],
            },
          },
        },
         "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|ttf|woff|woff2|)$/i,
        type: "asset",
        generator: {
          filename: 'fonts/[name][ext]'
        },
      },
      {
        test: /\.(bmp|svg|png|jpg|gif)$/i,
        type: "asset",
        generator: {
          filename: 'img/[name][ext]'
        },
      },
      {
        test: /\.(mp3|wav)$/i,
        type: "asset",
        generator: {
          filename: 'audio/[name][ext]'
        },
      },
      {
        test: /\.(mp4|avi)$/i,
        type: "asset",
        generator: {
          filename: 'video/[name][ext]'
        },
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());

  } else {
    config.mode = "development";
  }
  return config;
};
