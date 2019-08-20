'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const caw = require('caw');
const contentDisposition = require('content-disposition');
const decompress = require('decompress');
const filenamify = require('filenamify');
const getStream = require('get-stream');
const got = require('got');
const makeDir = require('make-dir');
const pify = require('pify');
const pEvent = require('p-event');
const fileType = require('file-type');
const extName = require('ext-name');

const fsP = pify(fs);
const filenameFromPath = res => path.basename(url.parse(res.requestUrl).pathname);

const getExtFromMime = res => {
	const header = res.headers['content-type'];

	if (!header) {
		return null;
	}

	const exts = extName.mime(header);

	if (exts.length !== 1) {
		return null;
	}

	return exts[0].ext;
};

const getFilename = (res, data) => {
	const header = res.headers['content-disposition'];

	if (header) {
		const parsed = contentDisposition.parse(header);

		if (parsed.parameters && parsed.parameters.filename) {
			return parsed.parameters.filename;
		}
	}

	let filename = filenameFromPath(res);

	if (!path.extname(filename)) {
		const ext = (fileType(data) || {}).ext || getExtFromMime(res);

		if (ext) {
			filename = `${filename}.${ext}`;
		}
	}

	return filename;
};

module.exports = (uri, output, opts) => {
	if (typeof output === 'object') {
		opts = output;
		output = null;
	}

	let protocol = url.parse(uri).protocol;

	if (protocol) {
		protocol = protocol.slice(0, -1);
	}

	opts = Object.assign({
		encoding: null,
		rejectUnauthorized: process.env.npm_config_strict_ssl !== 'false'
	}, opts);

	const agent = caw(opts.proxy, {protocol});
	const stream = got.stream(uri, Object.assign({agent}, opts));

	const promise = pEvent(stream, 'response').then(res => {
		const encoding = opts.encoding === null ? 'buffer' : opts.encoding;
		return Promise.all([getStream(stream, {encoding}), res]);
	}).then(result => {
		// TODO: Use destructuring when targeting Node.js 6
		const data = result[0];
		const res = result[1];

		if (!output) {
			return opts.extract ? decompress(data, opts) : data;
		}

		const filename = opts.filename || filenamify(getFilename(res, data));
		const outputFilepath = path.join(output, filename);

		if (opts.extract) {
			return decompress(data, path.dirname(outputFilepath), opts);
		}

		return makeDir(path.dirname(outputFilepath))
			.then(() => fsP.writeFile(outputFilepath, data))
			.then(() => data);
	});

	stream.then = promise.then.bind(promise);
	stream.catch = promise.catch.bind(promise);

	return stream;
};
