'use strict';
var mimeDb = require('mime-db');

module.exports = function () {
	var ret = {};

	Object.keys(mimeDb).forEach(function (x) {
		var val = mimeDb[x];

		if (val.extensions && val.extensions.length > 0) {
			val.extensions.forEach(function (y) {
				ret[y] = x;
			});
		}
	});

	return ret;
};
