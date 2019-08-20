/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const WebpackError = require("../WebpackError");
const SizeFormatHelpers = require("../SizeFormatHelpers");

class MinMaxSizeWarning extends WebpackError {
	constructor(keys, minSize, maxSize) {
		let keysMessage = "Fallback cache group";
		if (keys) {
			keysMessage =
				keys.length > 1
					? `Cache groups ${keys.sort().join(", ")}`
					: `Cache group ${keys[0]}`;
		}
		super(
			`SplitChunksPlugin\n` +
				`${keysMessage}\n` +
				`Configured minSize (${SizeFormatHelpers.formatSize(minSize)}) is ` +
				`bigger than maxSize (${SizeFormatHelpers.formatSize(maxSize)}).\n` +
				"This seem to be a invalid optimiziation.splitChunks configuration."
		);
	}
}

module.exports = MinMaxSizeWarning;
