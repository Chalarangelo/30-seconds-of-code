'use strict';
var Promise = require('pinkie-promise');
var objectAssign = require('object-assign');
var bufferStream = require('./buffer-stream');

function getStream(inputStream, opts) {
	if (!inputStream) {
		return Promise.reject(new Error('Expected a stream'));
	}

	opts = objectAssign({maxBuffer: Infinity}, opts);
	var maxBuffer = opts.maxBuffer;
	var stream;
	var clean;

	var p = new Promise(function (resolve, reject) {
		stream = bufferStream(opts);
		inputStream.once('error', error);
		inputStream.pipe(stream);

		stream.on('data', function () {
			if (stream.getBufferedLength() > maxBuffer) {
				reject(new Error('maxBuffer exceeded'));
			}
		});
		stream.once('error', error);
		stream.on('end', resolve);

		clean = function () {
			// some streams doesn't implement the stream.Readable interface correctly
			if (inputStream.unpipe) {
				inputStream.unpipe(stream);
			}
		};

		function error(err) {
			if (err) { // null check
				err.bufferedData = stream.getBufferedValue();
			}
			reject(err);
		}
	});

	p.then(clean, clean);

	return p.then(function () {
		return stream.getBufferedValue();
	});
}

module.exports = getStream;

module.exports.buffer = function (stream, opts) {
	return getStream(stream, objectAssign({}, opts, {encoding: 'buffer'}));
};

module.exports.array = function (stream, opts) {
	return getStream(stream, objectAssign({}, opts, {array: true}));
};
