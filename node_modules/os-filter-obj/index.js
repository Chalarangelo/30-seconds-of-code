'use strict';
module.exports = input => {
	const arch = require('arch')();
	const check = (bool, key, val) => (!bool || !key || key === val);

	return input.filter(x => [process.platform, arch].every((y, i) => check(i === 0, x.os, y) && check(i === 1, x.arch, y)));
};
