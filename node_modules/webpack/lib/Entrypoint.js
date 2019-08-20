/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const ChunkGroup = require("./ChunkGroup");

/** @typedef {import("./Chunk")} Chunk */

/**
 * Entrypoint serves as an encapsulation primitive for chunks that are
 * a part of a single ChunkGroup. They represent all bundles that need to be loaded for a
 * single instance of a page. Multi-page application architectures will typically yield multiple Entrypoint objects
 * inside of the compilation, whereas a Single Page App may only contain one with many lazy-loaded chunks.
 */
class Entrypoint extends ChunkGroup {
	/**
	 * Creates an instance of Entrypoint.
	 * @param {string} name the name of the entrypoint
	 */
	constructor(name) {
		super(name);
		/** @type {Chunk=} */
		this.runtimeChunk = undefined;
	}

	/**
	 * isInitial will always return true for Entrypoint ChunkGroup.
	 * @returns {true} returns true as all entrypoints are initial ChunkGroups
	 */
	isInitial() {
		return true;
	}

	/**
	 * Sets the runtimeChunk for an entrypoint.
	 * @param {Chunk} chunk the chunk being set as the runtime chunk.
	 * @returns {void}
	 */
	setRuntimeChunk(chunk) {
		this.runtimeChunk = chunk;
	}

	/**
	 * Fetches the chunk reference containing the webpack bootstrap code
	 * @returns {Chunk} returns the runtime chunk or first chunk in `this.chunks`
	 */
	getRuntimeChunk() {
		return this.runtimeChunk || this.chunks[0];
	}

	/**
	 * @param {Chunk} oldChunk chunk to be replaced
	 * @param {Chunk} newChunk New chunkt that will be replaced
	 * @returns {boolean} rerturns true for
	 */
	replaceChunk(oldChunk, newChunk) {
		if (this.runtimeChunk === oldChunk) this.runtimeChunk = newChunk;
		return super.replaceChunk(oldChunk, newChunk);
	}
}

module.exports = Entrypoint;
