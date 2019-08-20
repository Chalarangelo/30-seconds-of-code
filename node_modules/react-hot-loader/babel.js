'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/babel.production.min.js');
} else {
  module.exports = require('./dist/babel.development.js');
}
