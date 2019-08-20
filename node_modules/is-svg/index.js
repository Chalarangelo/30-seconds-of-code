'use strict';
const htmlCommentRegex = require('html-comment-regex');

function isBinary(buf) {
	const isBuf = Buffer.isBuffer(buf);

	for (let i = 0; i < 24; i++) {
		const charCode = isBuf ? buf[i] : buf.charCodeAt(i);

		if (charCode === 65533 || charCode <= 8) {
			return true;
		}
	}

	return false;
}

const regex = /^\s*(?:<\?xml[^>]*>\s*)?(?:<!doctype svg[^>]*\s*(?:\[?(?:\s*<![^>]*>\s*)*\]?)*[^>]*>\s*)?<svg[^>]*>[^]*<\/svg>\s*$/i;

module.exports = input => Boolean(input) && !isBinary(input) && regex.test(input.toString().replace(htmlCommentRegex, ''));
