'use strict';
const decompressTar = require('decompress-tar');
const fileType = require('file-type');
const isStream = require('is-stream');
const seekBzip = require('seek-bzip');
const unbzip2Stream = require('unbzip2-stream');

module.exports = () => input => {
	if (!Buffer.isBuffer(input) && !isStream(input)) {
		return Promise.reject(new TypeError(`Expected a Buffer or Stream, got ${typeof input}`));
	}

	if (Buffer.isBuffer(input) && (!fileType(input) || fileType(input).ext !== 'bz2')) {
		return Promise.resolve([]);
	}

	if (Buffer.isBuffer(input)) {
		return decompressTar()(seekBzip.decode(input));
	}

	return decompressTar()(input.pipe(unbzip2Stream()));
};
