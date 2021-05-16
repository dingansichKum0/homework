const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

const sourceDir = path.join(__dirname, "./src");
const distDir = path.join(__dirname, "./dist");

module.exports = (env, argv) => {
  return {
    // devtool: "source-map",
    entry: {
      app: `${sourceDir}/index.tsx`,
    },
    module: {
      rules: [
        {
          exclude: /node_modules/,
          loader: "ts-loader",
          options: {
            experimentalWatchApi: true,
            transpileOnly: true,
          },
          test: /\.tsx?$/,
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { sourceMap: false },
            },
          ],
        },
      ],
    },
    node: {
      fs: "empty",
      module: "empty",
    },
    output: {
      filename: "js/[name].js",
      publicPath: "/",
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: `${distDir}/index.html`,
        template: `${sourceDir}/index.html`,
        buildInfo: new Date().toGMTString(),
      }),
    ],
    resolve: {
      alias: {},
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: "./tsconfig.json",
        }),
      ],
    },
  };
};
