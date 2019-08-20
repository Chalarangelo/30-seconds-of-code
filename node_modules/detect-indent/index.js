'use strict';

// detect either spaces or tabs but not both to properly handle tabs
// for indentation and spaces for alignment
const INDENT_RE = /^(?:( )+|\t+)/;

function getMostUsed(indents) {
	let result = 0;
	let maxUsed = 0;
	let maxWeight = 0;

	for (const entry of indents) {
		// TODO: use destructuring when targeting Node.js 6
		const key = entry[0];
		const val = entry[1];

		const u = val[0];
		const w = val[1];

		if (u > maxUsed || (u === maxUsed && w > maxWeight)) {
			maxUsed = u;
			maxWeight = w;
			result = Number(key);
		}
	}

	return result;
}

module.exports = str => {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	// used to see if tabs or spaces are the most used
	let tabs = 0;
	let spaces = 0;

	// remember the size of previous line's indentation
	let prev = 0;

	// remember how many indents/unindents as occurred for a given size
	// and how much lines follow a given indentation
	//
	// indents = {
	//    3: [1, 0],
	//    4: [1, 5],
	//    5: [1, 0],
	//   12: [1, 0],
	// }
	const indents = new Map();

	// pointer to the array of last used indent
	let current;

	// whether the last action was an indent (opposed to an unindent)
	let isIndent;

	for (const line of str.split(/\n/g)) {
		if (!line) {
			// ignore empty lines
			continue;
		}

		let indent;
		const matches = line.match(INDENT_RE);

		if (matches) {
			indent = matches[0].length;

			if (matches[1]) {
				spaces++;
			} else {
				tabs++;
			}
		} else {
			indent = 0;
		}

		const diff = indent - prev;
		prev = indent;

		if (diff) {
			// an indent or unindent has been detected

			isIndent = diff > 0;

			current = indents.get(isIndent ? diff : -diff);

			if (current) {
				current[0]++;
			} else {
				current = [1, 0];
				indents.set(diff, current);
			}
		} else if (current) {
			// if the last action was an indent, increment the weight
			current[1] += Number(isIndent);
		}
	}

	const amount = getMostUsed(indents);

	let type;
	let indent;
	if (!amount) {
		type = null;
		indent = '';
	} else if (spaces >= tabs) {
		type = 'space';
		indent = ' '.repeat(amount);
	} else {
		type = 'tab';
		indent = '\t'.repeat(amount);
	}

	return {
		amount,
		type,
		indent
	};
};
