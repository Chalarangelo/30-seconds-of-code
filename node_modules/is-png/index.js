'use strict';
module.exports = function (buf) {
	if (!buf || buf.length < 8) {
		return false;
	}

	return buf[0] === 137 &&
		buf[1] === 80 &&
		buf[2] === 78 &&
		buf[3] === 71 &&
		buf[4] === 13 &&
		buf[5] === 10 &&
		buf[6] === 26 &&
		buf[7] === 10;
};
