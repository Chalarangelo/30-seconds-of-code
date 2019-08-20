import fs from "fs";
import path from "path";
import ExtractTextPlugin from "extract-text-webpack-plugin";

export function readFileOrEmpty(path) {
  try {
    return fs.readFileSync(path, "utf-8");
  } catch (e) {
    return "";
  }
}

export const defaultConfig = {
  entry: "./index",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: { loader: "style-loader" },
          use: {
            loader: "css-loader"
          }
        })
      }
    ]
  },
  plugins: [],
  context: __dirname,
  output: {
    filename: "destination.js",
    path: path.resolve(__dirname, "../", "js", "default-exports")
  }
};

export function checkForWebpackErrors({ err, stats, done }) {
  if (err) return done(err);
  if (stats.hasErrors()) return done(new Error(stats.toString()));
}
