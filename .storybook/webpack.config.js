const path = require('path');

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });

  config.module.rules.push({
    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
    loaders: ['file-loader'],
    include: path.resolve(__dirname, '../')
  });

  return config;
};