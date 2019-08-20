'use strict';
const fs = require('fs');
const pify = require('pify');
const withOpenFile = require('with-open-file');

const fsReadP = pify(fs.read, {multiArgs: true});

const readChunk = (filePath, startPosition, length) => {
	const buffer = Buffer.alloc(length);

	return withOpenFile(filePath, 'r', fileDescriptor =>
		fsReadP(fileDescriptor, buffer, 0, length, startPosition)
	)
		.then(([bytesRead, buffer]) => {
			if (bytesRead < length) {
				buffer = buffer.slice(0, bytesRead);
			}

			return buffer;
		});
};

module.exports = readChunk;
// TODO: Remove this for the next major release
module.exports.default = readChunk;

module.exports.sync = (filePath, startPosition, length) => {
	let buffer = Buffer.alloc(length);

	const bytesRead = withOpenFile.sync(filePath, 'r', fileDescriptor =>
		fs.readSync(fileDescriptor, buffer, 0, length, startPosition)
	);

	if (bytesRead < length) {
		buffer = buffer.slice(0, bytesRead);
	}

	return buffer;
};
