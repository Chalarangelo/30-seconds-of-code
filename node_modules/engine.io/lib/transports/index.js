
/**
 * Module dependencies.
 */

var XHR = require('./polling-xhr');
var JSONP = require('./polling-jsonp');

/**
 * Export transports.
 */

module.exports = exports = {
  polling: polling,
  websocket: require('./websocket')
};

/**
 * Export upgrades map.
 */

exports.polling.upgradesTo = ['websocket'];

/**
 * Polling polymorphic constructor.
 *
 * @api private
 */

function polling (req) {
  if ('string' === typeof req._query.j) {
    return new JSONP(req);
  } else {
    return new XHR(req);
  }
}
