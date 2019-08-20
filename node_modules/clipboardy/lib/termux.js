'use strict';
const execa = require('execa');

const handler = err => {
	if (err.code === 'ENOENT') {
		throw new Error('Couldn\'t find the termux-api scripts. You can install them with: apt install termux-api');
	}

	throw err;
};

module.exports = {
	copy: opts => execa('termux-clipboard-set', opts).catch(handler),
	paste: opts => execa.stdout('termux-clipboard-get', opts).catch(handler),
	copySync: opts => {
		try {
			return execa.sync('termux-clipboard-set', opts);
		} catch (err) {
			handler(err);
		}
	},
	pasteSync: opts => {
		try {
			return execa.sync('termux-clipboard-get', opts);
		} catch (err) {
			handler(err);
		}
	}
};
