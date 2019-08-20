'use strict';

if (!module.hot || process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/react-hot-loader.production.min.js');
} else {
  module.exports = require('./dist/react-hot-loader.development.js');
}
