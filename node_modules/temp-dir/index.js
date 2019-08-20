'use strict';
const fs = require('fs');
const os = require('os');

const ID = '__RESOLVED_TMP_DIR__';

if (!global[ID]) {
	Object.defineProperty(global, ID, {
		value: fs.realpathSync(os.tmpdir())
	});
}

module.exports = global[ID];
