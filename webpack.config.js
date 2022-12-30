module.exports = {
  mode: "development",
  target: "node",
  entry: "./src/server/index.ts",
  output: {
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts"],
  },
  module: {
    rules: [{ test: /\.([cm]?ts)$/, loader: "ts-loader" }],
  },
};
