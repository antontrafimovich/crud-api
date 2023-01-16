const process = require("process");

const WebpackShellPluginNext = require("webpack-shell-plugin-next");

let plugins = [];
if (process.env.NODE_ENV === "development") {
  plugins.push(
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: ["nodemon dist/server.js"],
        parallel: true,
      },
    })
  );
}

module.exports = {
  mode: process.env.NODE_ENV ?? "development",
  target: "node",
  entry: "./src/server/index.ts",
  output: {
    filename: "server.js",
  },
  resolve: {
    extensions: [".ts"],
  },
  module: {
    rules: [{ test: /\.([cm]?ts)$/, loader: "ts-loader" }],
  },
  plugins,
};
