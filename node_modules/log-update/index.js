'use strict';
const ansiEscapes = require('ansi-escapes');
const cliCursor = require('cli-cursor');
const wrapAnsi = require('wrap-ansi');

const getWidth = stream => {
	const {columns} = stream;

	if (!columns) {
		return 80;
	}

	// Windows appears to wrap a character early
	// I hate Windows so much
	if (process.platform === 'win32') {
		return columns - 1;
	}

	return columns;
};

const main = (stream, options) => {
	options = Object.assign({
		showCursor: false
	}, options);

	let prevLineCount = 0;

	const render = (...args) => {
		if (!options.showCursor) {
			cliCursor.hide();
		}

		let out = args.join(' ') + '\n';
		out = wrapAnsi(out, getWidth(stream), {
			trim: false,
			hard: true,
			wordWrap: false
		});
		stream.write(ansiEscapes.eraseLines(prevLineCount) + out);
		prevLineCount = out.split('\n').length;
	};

	render.clear = () => {
		stream.write(ansiEscapes.eraseLines(prevLineCount));
		prevLineCount = 0;
	};

	render.done = () => {
		prevLineCount = 0;

		if (!options.showCursor) {
			cliCursor.show();
		}
	};

	return render;
};

module.exports = main(process.stdout);
// TODO: Remove this for the next major release
module.exports.default = module.exports;
module.exports.stderr = main(process.stderr);
module.exports.create = main;
