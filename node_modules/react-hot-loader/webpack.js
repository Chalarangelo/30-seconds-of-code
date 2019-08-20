if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/webpack.production.min.js');
} else {
  module.exports = require('./dist/webpack.development.js');
}
