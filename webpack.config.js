module.exports = {
  mode: "development",
  target: "node",
  entry: "./src/index.ts",
  output: {
    filename: "multi.js",
  },
  resolve: {
    extensions: [".ts"],
  },
  module: {
    rules: [{ test: /\.([cm]?ts)$/, loader: "ts-loader" }],
  },
};
