/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Jason Anderson @diurnalist
*/
"use strict";

const REGEXP_HASH = /\[hash(?::(\d+))?\]/gi,
	REGEXP_CHUNKHASH = /\[chunkhash(?::(\d+))?\]/gi,
	REGEXP_MODULEHASH = /\[modulehash(?::(\d+))?\]/gi,
	REGEXP_CONTENTHASH = /\[contenthash(?::(\d+))?\]/gi,
	REGEXP_NAME = /\[name\]/gi,
	REGEXP_ID = /\[id\]/gi,
	REGEXP_MODULEID = /\[moduleid\]/gi,
	REGEXP_FILE = /\[file\]/gi,
	REGEXP_QUERY = /\[query\]/gi,
	REGEXP_FILEBASE = /\[filebase\]/gi;

// Using global RegExp for .test is dangerous
// We use a normal RegExp instead of .test
const REGEXP_HASH_FOR_TEST = new RegExp(REGEXP_HASH.source, "i"),
	REGEXP_CHUNKHASH_FOR_TEST = new RegExp(REGEXP_CHUNKHASH.source, "i"),
	REGEXP_CONTENTHASH_FOR_TEST = new RegExp(REGEXP_CONTENTHASH.source, "i"),
	REGEXP_NAME_FOR_TEST = new RegExp(REGEXP_NAME.source, "i");

const withHashLength = (replacer, handlerFn) => {
	const fn = (match, hashLength, ...args) => {
		const length = hashLength && parseInt(hashLength, 10);
		if (length && handlerFn) {
			return handlerFn(length);
		}
		const hash = replacer(match, hashLength, ...args);
		return length ? hash.slice(0, length) : hash;
	};
	return fn;
};

const getReplacer = (value, allowEmpty) => {
	const fn = (match, ...args) => {
		// last argument in replacer is the entire input string
		const input = args[args.length - 1];
		if (value === null || value === undefined) {
			if (!allowEmpty) {
				throw new Error(
					`Path variable ${match} not implemented in this context: ${input}`
				);
			}
			return "";
		} else {
			return `${value}`;
		}
	};
	return fn;
};

const replacePathVariables = (path, data) => {
	const chunk = data.chunk;
	const chunkId = chunk && chunk.id;
	const chunkName = chunk && (chunk.name || chunk.id);
	const chunkHash = chunk && (chunk.renderedHash || chunk.hash);
	const chunkHashWithLength = chunk && chunk.hashWithLength;
	const contentHashType = data.contentHashType;
	const contentHash =
		(chunk && chunk.contentHash && chunk.contentHash[contentHashType]) ||
		data.contentHash;
	const contentHashWithLength =
		(chunk &&
			chunk.contentHashWithLength &&
			chunk.contentHashWithLength[contentHashType]) ||
		data.contentHashWithLength;
	const module = data.module;
	const moduleId = module && module.id;
	const moduleHash = module && (module.renderedHash || module.hash);
	const moduleHashWithLength = module && module.hashWithLength;

	if (typeof path === "function") {
		path = path(data);
	}

	if (
		data.noChunkHash &&
		(REGEXP_CHUNKHASH_FOR_TEST.test(path) ||
			REGEXP_CONTENTHASH_FOR_TEST.test(path))
	) {
		throw new Error(
			`Cannot use [chunkhash] or [contenthash] for chunk in '${path}' (use [hash] instead)`
		);
	}

	return (
		path
			.replace(
				REGEXP_HASH,
				withHashLength(getReplacer(data.hash), data.hashWithLength)
			)
			.replace(
				REGEXP_CHUNKHASH,
				withHashLength(getReplacer(chunkHash), chunkHashWithLength)
			)
			.replace(
				REGEXP_CONTENTHASH,
				withHashLength(getReplacer(contentHash), contentHashWithLength)
			)
			.replace(
				REGEXP_MODULEHASH,
				withHashLength(getReplacer(moduleHash), moduleHashWithLength)
			)
			.replace(REGEXP_ID, getReplacer(chunkId))
			.replace(REGEXP_MODULEID, getReplacer(moduleId))
			.replace(REGEXP_NAME, getReplacer(chunkName))
			.replace(REGEXP_FILE, getReplacer(data.filename))
			.replace(REGEXP_FILEBASE, getReplacer(data.basename))
			// query is optional, it's OK if it's in a path but there's nothing to replace it with
			.replace(REGEXP_QUERY, getReplacer(data.query, true))
	);
};

class TemplatedPathPlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap("TemplatedPathPlugin", compilation => {
			const mainTemplate = compilation.mainTemplate;

			mainTemplate.hooks.assetPath.tap(
				"TemplatedPathPlugin",
				replacePathVariables
			);

			mainTemplate.hooks.globalHash.tap(
				"TemplatedPathPlugin",
				(chunk, paths) => {
					const outputOptions = mainTemplate.outputOptions;
					const publicPath = outputOptions.publicPath || "";
					const filename = outputOptions.filename || "";
					const chunkFilename =
						outputOptions.chunkFilename || outputOptions.filename;
					if (
						REGEXP_HASH_FOR_TEST.test(publicPath) ||
						REGEXP_CHUNKHASH_FOR_TEST.test(publicPath) ||
						REGEXP_CONTENTHASH_FOR_TEST.test(publicPath) ||
						REGEXP_NAME_FOR_TEST.test(publicPath)
					)
						return true;
					if (REGEXP_HASH_FOR_TEST.test(filename)) return true;
					if (REGEXP_HASH_FOR_TEST.test(chunkFilename)) return true;
					if (REGEXP_HASH_FOR_TEST.test(paths.join("|"))) return true;
				}
			);

			mainTemplate.hooks.hashForChunk.tap(
				"TemplatedPathPlugin",
				(hash, chunk) => {
					const outputOptions = mainTemplate.outputOptions;
					const chunkFilename =
						outputOptions.chunkFilename || outputOptions.filename;
					if (REGEXP_CHUNKHASH_FOR_TEST.test(chunkFilename)) {
						hash.update(JSON.stringify(chunk.getChunkMaps(true).hash));
					}
					if (REGEXP_CONTENTHASH_FOR_TEST.test(chunkFilename)) {
						hash.update(
							JSON.stringify(
								chunk.getChunkMaps(true).contentHash.javascript || {}
							)
						);
					}
					if (REGEXP_NAME_FOR_TEST.test(chunkFilename)) {
						hash.update(JSON.stringify(chunk.getChunkMaps(true).name));
					}
				}
			);
		});
	}
}

module.exports = TemplatedPathPlugin;
