import { CallableOption } from "webpack-cli";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { merge } from "webpack-merge";
import baseConfig from "./webpack.base";
import webpack from "webpack";

const devConfig: CallableOption = () => {
  return merge(baseConfig("development"), {
    cache: true,
    devtool: "source-map",

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
          mode: "write-references",
        },
      }),
    ],
    // @ts-ignore
    devServer: {
      port: 3009,
      historyApiFallback: true,
      allowedHosts: "all",
      compress: true,
      open: true,
      hot: true,
      host: "0.0.0.0",

      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },
  });
};

export default devConfig;

