'use strict';
const builtinModules = require('builtin-modules');

const moduleSet = new Set(builtinModules);

module.exports = moduleName => {
	if (typeof moduleName !== 'string') {
		throw new TypeError('Expected a string');
	}

	return moduleSet.has(moduleName);
};
