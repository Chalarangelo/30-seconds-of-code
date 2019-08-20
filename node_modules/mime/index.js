'use strict';

var Mime = require('./Mime');
module.exports = new Mime(require('./types/standard'), require('./types/other'));
