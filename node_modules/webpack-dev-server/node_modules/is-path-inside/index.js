'use strict';
const path = require('path');
const pathIsInside = require('path-is-inside');

module.exports = (childPath, parentPath) => {
	childPath = path.resolve(childPath);
	parentPath = path.resolve(parentPath);

	if (childPath === parentPath) {
		return false;
	}

	return pathIsInside(childPath, parentPath);
};
