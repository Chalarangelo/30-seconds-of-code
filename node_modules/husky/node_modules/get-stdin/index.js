'use strict';
const stdin = process.stdin;

module.exports = () => {
	let ret = '';

	return new Promise(resolve => {
		if (stdin.isTTY) {
			resolve(ret);
			return;
		}

		stdin.setEncoding('utf8');

		stdin.on('readable', () => {
			let chunk;

			while ((chunk = stdin.read())) {
				ret += chunk;
			}
		});

		stdin.on('end', () => {
			resolve(ret);
		});
	});
};

module.exports.buffer = () => {
	const ret = [];
	let len = 0;

	return new Promise(resolve => {
		if (stdin.isTTY) {
			resolve(Buffer.concat([]));
			return;
		}

		stdin.on('readable', () => {
			let chunk;

			while ((chunk = stdin.read())) {
				ret.push(chunk);
				len += chunk.length;
			}
		});

		stdin.on('end', () => {
			resolve(Buffer.concat(ret, len));
		});
	});
};
