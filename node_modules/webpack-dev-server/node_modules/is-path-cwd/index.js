'use strict';
const path = require('path');

module.exports = path_ => {
	let cwd = process.cwd();

	path_ = path.resolve(path_);

	if (process.platform === 'win32') {
		cwd = cwd.toLowerCase();
		path_ = path_.toLowerCase();
	}

	return path_ === cwd;
};
