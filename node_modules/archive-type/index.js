'use strict';
const fileType = require('file-type');

const exts = new Set([
	'7z',
	'bz2',
	'gz',
	'rar',
	'tar',
	'zip',
	'xz',
	'gz'
]);

module.exports = input => {
	const ret = fileType(input);
	return exts.has(ret && ret.ext) ? ret : null;
};
