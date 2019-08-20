'use strict';
const execa = require('execa');
const isJpg = require('is-jpg');
const mozjpeg = require('mozjpeg');

module.exports = options => buffer => {
	options = Object.assign({
		trellis: true,
		trellisDC: true,
		overshoot: true
	}, options);

	if (!Buffer.isBuffer(buffer)) {
		return Promise.reject(new TypeError('Expected a buffer'));
	}

	if (!isJpg(buffer)) {
		return Promise.resolve(buffer);
	}

	// TODO: Remove these sometime far in the future
	if (options.fastcrush) {
		return Promise.reject(new Error('Option `fastcrush` was renamed to `fastCrush`'));
	}
	if (options.maxmemory) {
		return Promise.reject(new Error('Option `maxmemory` was renamed to `maxMemory`'));
	}
	if (options.notrellis) {
		return Promise.reject(new Error('Option `notrellis` was renamed to `trellis` and inverted'));
	}
	if (options.noovershoot) {
		return Promise.reject(new Error('Option `noovershoot` was renamed to `overshoot` and inverted'));
	}

	const args = [];

	if (typeof options.quality !== 'undefined') {
		args.push('-quality', options.quality);
	}

	if (options.progressive === false) {
		args.push('-baseline');
	}

	if (options.targa) {
		args.push('-targa');
	}

	if (options.revert) {
		args.push('-revert');
	}

	if (options.fastCrush) {
		args.push('-fastcrush');
	}

	if (typeof options.dcScanOpt !== 'undefined') {
		args.push('-dc-scan-opt', options.dcScanOpt);
	}

	if (!options.trellis) {
		args.push('-notrellis');
	}

	if (!options.trellisDC) {
		args.push('-notrellis-dc');
	}

	if (options.tune) {
		args.push(`-tune-${options.tune}`);
	}

	if (!options.overshoot) {
		args.push('-noovershoot');
	}

	if (options.arithmetic) {
		args.push('-arithmetic');
	}

	if (options.dct) {
		args.push('-dct', options.dct);
	}

	if (options.quantBaseline) {
		args.push('-quant-baseline', options.quantBaseline);
	}

	if (typeof options.quantTable !== 'undefined') {
		args.push('-quant-table', options.quantTable);
	}

	if (options.smooth) {
		args.push('-smooth', options.smooth);
	}

	if (options.maxMemory) {
		args.push('-maxmemory', options.maxMemory);
	}

	if (options.sample) {
		args.push('-sample', options.sample.join(','));
	}

	return execa.stdout(mozjpeg, args, {
		encoding: null,
		input: buffer,
		maxBuffer: Infinity
	});
};
