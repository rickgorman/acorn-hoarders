var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./lib/sim.js",
  output: {
    path: path.resolve(__dirname, 'dist', 'script'),
    filename: "bundle-sim.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
