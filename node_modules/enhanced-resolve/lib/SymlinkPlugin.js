/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const getPaths = require("./getPaths");
const forEachBail = require("./forEachBail");

module.exports = class SymlinkPlugin {
	constructor(source, target) {
		this.source = source;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		const fs = resolver.fileSystem;
		resolver.getHook(this.source).tapAsync("SymlinkPlugin", (request, resolveContext, callback) => {
			const pathsResult = getPaths(request.path);
			const pathSeqments = pathsResult.seqments;
			const paths = pathsResult.paths;

			let containsSymlink = false;
			forEachBail.withIndex(paths, (path, idx, callback) => {
				fs.readlink(path, (err, result) => {
					if(!err && result) {
						pathSeqments[idx] = result;
						containsSymlink = true;
						// Shortcut when absolute symlink found
						if(/^(\/|[a-zA-Z]:($|\\))/.test(result))
							return callback(null, idx);
					}
					callback();
				});
			}, (err, idx) => {
				if(!containsSymlink) return callback();
				const resultSeqments = typeof idx === "number" ? pathSeqments.slice(0, idx + 1) : pathSeqments.slice();
				const result = resultSeqments.reverse().reduce((a, b) => {
					return resolver.join(a, b);
				});
				const obj = Object.assign({}, request, {
					path: result
				});
				resolver.doResolve(target, obj, "resolved symlink to " + result, resolveContext, callback);
			});
		});
	}
};
