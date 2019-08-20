'use strict';
const isFullwidthCodePoint = require('is-fullwidth-code-point');

const ESCAPES = [
	'\u001B',
	'\u009B'
];

const END_CODE = 39;
const ASTRAL_REGEX = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

const ESCAPE_CODES = new Map([
	[0, 0],
	[1, 22],
	[2, 22],
	[3, 23],
	[4, 24],
	[7, 27],
	[8, 28],
	[9, 29],
	[30, 39],
	[31, 39],
	[32, 39],
	[33, 39],
	[34, 39],
	[35, 39],
	[36, 39],
	[37, 39],
	[90, 39],
	[40, 49],
	[41, 49],
	[42, 49],
	[43, 49],
	[44, 49],
	[45, 49],
	[46, 49],
	[47, 49]
]);

const wrapAnsi = code => `${ESCAPES[0]}[${code}m`;

module.exports = (str, begin, end) => {
	const arr = Array.from(str.normalize());

	end = typeof end === 'number' ? end : arr.length;

	let insideEscape = false;
	let escapeCode;
	let visible = 0;
	let output = '';

	for (const item of arr.entries()) {
		const i = item[0];
		const x = item[1];

		let leftEscape = false;

		if (ESCAPES.indexOf(x) !== -1) {
			insideEscape = true;
			const code = /\d[^m]*/.exec(str.slice(i, i + 4));
			escapeCode = code === END_CODE ? null : code;
		} else if (insideEscape && x === 'm') {
			insideEscape = false;
			leftEscape = true;
		}

		if (!insideEscape && !leftEscape) {
			++visible;
		}

		if (!ASTRAL_REGEX.test(x) && isFullwidthCodePoint(x.codePointAt())) {
			++visible;
		}

		if (visible > begin && visible <= end) {
			output += x;
		} else if (visible === begin && !insideEscape && escapeCode !== undefined && escapeCode !== END_CODE) {
			output += wrapAnsi(escapeCode);
		} else if (visible >= end) {
			if (escapeCode !== undefined) {
				output += wrapAnsi(ESCAPE_CODES.get(parseInt(escapeCode, 10)) || END_CODE);
			}
			break;
		}
	}

	return output;
};
