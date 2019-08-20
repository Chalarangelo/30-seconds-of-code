'use strict';
const resolveFrom = require('resolve-from');

module.exports = (fromDir, moduleId) => require(resolveFrom(fromDir, moduleId));

module.exports.silent = (fromDir, moduleId) => {
	try {
		return require(resolveFrom(fromDir, moduleId));
	} catch (err) {
		return null;
	}
};
