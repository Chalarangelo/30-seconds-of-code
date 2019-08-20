/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*global installedChunks $hotChunkFilename$ hotAddUpdateChunk $hotMainFilename$ */
module.exports = function() {
	// eslint-disable-next-line no-unused-vars
	function hotDownloadUpdateChunk(chunkId) {
		var chunk = require("./" + $hotChunkFilename$);
		hotAddUpdateChunk(chunk.id, chunk.modules);
	}

	// eslint-disable-next-line no-unused-vars
	function hotDownloadManifest() {
		try {
			var update = require("./" + $hotMainFilename$);
		} catch (e) {
			return Promise.resolve();
		}
		return Promise.resolve(update);
	}

	//eslint-disable-next-line no-unused-vars
	function hotDisposeChunk(chunkId) {
		delete installedChunks[chunkId];
	}
};
