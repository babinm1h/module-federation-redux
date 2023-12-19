import webpack, { Configuration } from "webpack";
import { PATHS } from "./const";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { resolveFromRoot } from "./utils";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import packs from "../package.json";

const baseConfig = (mode: Configuration["mode"], env: any): Configuration => {
  const isDevMode = mode !== "production";

  return {
    mode,
    devtool: isDevMode ? "eval-cheap-module-source-map" : undefined,

    entry: {
      app: PATHS.entry,
    },

    output: {
      path: PATHS.build,
      filename: "[name].[contenthash].js",
      clean: true,
      publicPath: "auto",
      assetModuleFilename: "assets/[hash][ext]",
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "MF States",
        publicPath: process.env.PUBLIC_PATH,
        template: resolveFromRoot("src/index.html"),
        minify: false,
      }),
      new MiniCssExtractPlugin(),

      // ====================
      new webpack.container.ModuleFederationPlugin({
        name: "state", //  имя микрофронта контейнера
        filename: "remoteEntry.js", //  имя файла который будем подключать к хосту

        remotes: {
          app1: "app1@http://localhost:3010/remoteEntry.js",
          host: "host@http://localhost:3009/remoteEntry.js",
        },

        exposes: {
          "./store": resolveFromRoot("src/store/index.ts"),
        },

        shared: {
          ...packs.dependencies,
          react: {
            eager: true, // загружать модуль сразу после того, как был загружен инициализирующий модуль / общий модуль будет загружен сразу при инициализации приложения, а не по требованию
            requiredVersion: packs.dependencies["react"], // версию общего модуля, которая должна быть загружена.
            singleton: true, // позволяет использовать только одну версию общего модуля
          },

          "react-router-dom": { eager: true, requiredVersion: packs.dependencies["react-router-dom"] },

          "react-dom": { eager: true, requiredVersion: packs.dependencies["react-dom"] },
        },
      }),
    ],

    module: {
      rules: [
        // TS
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        // SCSS
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: [
            isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: (resPath: string) => resPath.includes(".module."),
                  localIdentName: isDevMode ? "[path][name]__[local]--[hash:base64:5]" : "[hash:base64:8]",
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        // ASSETS
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolveLoader: {
      modules: [resolveFromRoot("node_modules")],
      extensions: [".ts", ".js"],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".scss", ".css"],
      preferAbsolute: true,
      modules: [PATHS.src, "node_modules"],
      mainFiles: ["index"],
      alias: {
        "@": PATHS.src,
      },
    },
  };
};

export default baseConfig;
