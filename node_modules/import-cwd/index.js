'use strict';
const importFrom = require('import-from');

module.exports = moduleId => importFrom(process.cwd(), moduleId);
module.exports.silent = moduleId => importFrom.silent(process.cwd(), moduleId);
