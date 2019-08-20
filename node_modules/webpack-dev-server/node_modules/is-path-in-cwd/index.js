'use strict';
const isPathInside = require('is-path-inside');

module.exports = path => isPathInside(path, process.cwd());
