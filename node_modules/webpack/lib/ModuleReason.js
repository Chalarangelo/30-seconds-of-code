/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

/** @typedef {import("./Module")} Module */
/** @typedef {import("./Dependency")} Dependency */

class ModuleReason {
	/**
	 * @param {Module} module the referencing module
	 * @param {Dependency} dependency the referencing dependency
	 * @param {string=} explanation some extra detail
	 */
	constructor(module, dependency, explanation) {
		this.module = module;
		this.dependency = dependency;
		this.explanation = explanation;
		this._chunks = null;
	}

	hasChunk(chunk) {
		if (this._chunks) {
			if (this._chunks.has(chunk)) return true;
		} else if (this.module && this.module._chunks.has(chunk)) return true;
		return false;
	}

	rewriteChunks(oldChunk, newChunks) {
		if (!this._chunks) {
			if (this.module) {
				if (!this.module._chunks.has(oldChunk)) return;
				this._chunks = new Set(this.module._chunks);
			} else {
				this._chunks = new Set();
			}
		}
		if (this._chunks.has(oldChunk)) {
			this._chunks.delete(oldChunk);
			for (let i = 0; i < newChunks.length; i++) {
				this._chunks.add(newChunks[i]);
			}
		}
	}
}

module.exports = ModuleReason;
