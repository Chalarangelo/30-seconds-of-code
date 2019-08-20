'use strict';
const sliceAnsi = require('slice-ansi');
const stringWidth = require('string-width');

module.exports = (input, columns, opts) => {
	opts = Object.assign({
		position: 'end'
	}, opts);

	const position = opts.position;
	const ellipsis = '…';

	if (typeof input !== 'string') {
		throw new TypeError(`Expected \`input\` to be a string, got ${typeof input}`);
	}

	if (typeof columns !== 'number') {
		throw new TypeError(`Expected \`columns\` to be a number, got ${typeof columns}`);
	}

	if (columns < 1) {
		return '';
	}

	if (columns === 1) {
		return ellipsis;
	}

	const length = stringWidth(input);

	if (length <= columns) {
		return input;
	}

	if (position === 'start') {
		return ellipsis + sliceAnsi(input, length - columns + 1, length);
	} else if (position === 'middle') {
		const half = Math.floor(columns / 2);
		return sliceAnsi(input, 0, half) + ellipsis + sliceAnsi(input, length - (columns - half) + 1, length);
	} else if (position === 'end') {
		return sliceAnsi(input, 0, columns - 1) + ellipsis;
	}

	throw new Error(`Expected \`options.position\` to be either \`start\`, \`middle\` or \`end\`, got ${position}`);
};
