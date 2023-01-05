const process = require("process");

const WebpackShellPluginNext = require("webpack-shell-plugin-next");

let plugins = [];
if (process.env.AT_CRUD_API_BUILD === "dev") {
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
  mode: "development",
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
