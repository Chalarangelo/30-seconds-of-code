'use strict';
const execa = require('execa');
const isPng = require('is-png');
const isStream = require('is-stream');
const pngquant = require('pngquant-bin');

module.exports = (options = {}) => input => {
	const isBuffer = Buffer.isBuffer(input);

	if (!isBuffer && !isStream(input)) {
		return Promise.reject(new TypeError(`Expected a Buffer or Stream, got ${typeof input}`));
	}

	if (isBuffer && !isPng(input)) {
		return Promise.resolve(input);
	}

	const args = ['-'];

	if (options.floyd && typeof options.floyd === 'number') {
		args.push(`--floyd=${options.floyd}`);
	}

	if (options.floyd && typeof options.floyd === 'boolean') {
		args.push('--floyd');
	}

	if (options.nofs) {
		args.push('--nofs');
	}

	if (options.posterize) {
		args.push('--posterize', options.posterize);
	}

	if (options.quality) {
		args.push('--quality', options.quality);
	}

	if (options.speed) {
		args.push('--speed', options.speed);
	}

	if (options.verbose) {
		args.push('--verbose');
	}

	if (options.strip) {
		args.push('--strip');
	}

	const cp = execa(pngquant, args, {
		encoding: null,
		maxBuffer: Infinity,
		input
	});

	const promise = cp
		.then(result => result.stdout)
		.catch(error => {
			if (error.code === 99) {
				return input;
			}

			error.message = error.stderr || error.message;
			throw error;
		});

	cp.stdout.then = promise.then.bind(promise);
	cp.stdout.catch = promise.catch.bind(promise);

	return cp.stdout;
};
