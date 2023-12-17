import { merge } from "webpack-merge";
import { CallableOption } from "webpack-cli";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import DeadCodePlugin from "webpack-deadcode-plugin";
import baseConfig from "./webpack.base";

export function getFilename({ isDevMode, isChunk, path, pathAsExt }: any): string {
  const hash = isChunk ? "chunkhash" : "contenthash";
  const name = isDevMode ? "[name]" : `[name].[${hash}:5]`;
  const extension = pathAsExt ? path.replace(/\./, "") : "[ext]";
  return `${path}/${name}.${extension}`;
}

const prodConfig: CallableOption = (env:any) => {
  console.log(env);
  return merge(baseConfig("production", env), {
    optimization: {
      usedExports: true,
      minimize: true,
      minimizer: ["...", new CssMinimizerPlugin()],
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
          },
        },
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: getFilename({ isDevMode: false, pathAsExt: true, path: "css" }),
        chunkFilename: getFilename({ isDevMode: false, isChunk: true, pathAsExt: true, path: "css" }),
      }),
      // @ts-ignore
      new DeadCodePlugin({
        patterns: ["src/**/*.*"],
      }),
    ],
  });
};
export default prodConfig;

