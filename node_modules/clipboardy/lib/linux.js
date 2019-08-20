'use strict';
const path = require('path');
const execa = require('execa');

const handler = err => {
	if (err.code === 'ENOENT') {
		throw new Error('Couldn\'t find the required `xsel` binary. On Debian/Ubuntu you can install it with: sudo apt install xsel');
	}

	throw err;
};

const xsel = path.join(__dirname, '../fallbacks/linux/xsel');

module.exports = {
	copy: opts => {
		return execa(xsel, ['--clipboard', '--input'], opts)
			.catch(() => execa('xsel', ['--clipboard', '--input'], opts))
			.catch(handler);
	},
	paste: opts => {
		return execa.stdout(xsel, ['--clipboard', '--output'], opts)
			.catch(() => execa.stdout('xsel', ['--clipboard', '--output'], opts))
			.catch(handler);
	},
	copySync: opts => {
		try {
			return execa.sync(xsel, ['--clipboard', '--input'], opts);
		} catch (err) {
			try {
				return execa.sync('xsel', ['--clipboard', '--input'], opts);
			} catch (err) {
				handler(err);
			}
		}
	},
	pasteSync: opts => {
		try {
			return execa.sync(xsel, ['--clipboard', '--output'], opts);
		} catch (err) {
			try {
				return execa.sync('xsel', ['--clipboard', '--output'], opts);
			} catch (err) {
				handler(err);
			}
		}
	}
};
