const pkg = require('./out/index');

module.exports = pkg.async;
module.exports.default = pkg.async;

module.exports.async = pkg.async;
module.exports.sync = pkg.sync;
module.exports.stream = pkg.stream;

module.exports.generateTasks = pkg.generateTasks;
