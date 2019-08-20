'use strict';
module.exports = function () {
	return process.getuid && process.getuid() === 0;
};
