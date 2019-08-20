'use strict';
const path = require('path');
const execa = require('execa');
const arch = require('arch');

// Binaries from: https://github.com/sindresorhus/win-clipboard
const winBinPath = arch() === 'x64' ?
	path.join(__dirname, '../fallbacks/windows/clipboard_x86_64.exe') :
	path.join(__dirname, '../fallbacks/windows/clipboard_i686.exe');

module.exports = {
	copy: opts => execa(winBinPath, ['--copy'], opts),
	paste: opts => execa.stdout(winBinPath, ['--paste'], opts),
	copySync: opts => execa.sync(winBinPath, ['--copy'], opts),
	pasteSync: opts => execa.sync(winBinPath, ['--paste'], opts)
};
