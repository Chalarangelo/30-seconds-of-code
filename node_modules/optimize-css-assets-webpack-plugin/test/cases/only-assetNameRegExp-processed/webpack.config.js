import ExtractTextPlugin from "extract-text-webpack-plugin";
import OptimizeCssAssetsPlugin from "../../../src/";

const notToProcess = new ExtractTextPlugin("as_is.css");
const toProcess = new ExtractTextPlugin("optimize.css");

module.exports = {
  entry: "./index",
  module: {
    rules: [
      {
        test: /as-is\.css$/,
        use: notToProcess.extract({
          fallback: { loader: "style-loader" },
          use: {
            loader: "css-loader"
          }
        })
      },
      {
        test: /optimize-me\.css$/,
        use: toProcess.extract({
          fallback: { loader: "style-loader" },
          use: {
            loader: "css-loader"
          }
        })
      }
    ]
  },
  plugins: [
    notToProcess,
    toProcess,
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /optimize\.css/g
    })
  ]
};
