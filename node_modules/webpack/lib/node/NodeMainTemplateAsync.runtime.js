/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*global installedChunks $hotChunkFilename$ $require$ hotAddUpdateChunk $hotMainFilename$ */
module.exports = function() {
	// eslint-disable-next-line no-unused-vars
	function hotDownloadUpdateChunk(chunkId) {
		var filename = require("path").join(__dirname, $hotChunkFilename$);
		require("fs").readFile(filename, "utf-8", function(err, content) {
			if (err) {
				if ($require$.onError) return $require$.oe(err);
				throw err;
			}
			var chunk = {};
			require("vm").runInThisContext(
				"(function(exports) {" + content + "\n})",
				{ filename: filename }
			)(chunk);
			hotAddUpdateChunk(chunk.id, chunk.modules);
		});
	}

	// eslint-disable-next-line no-unused-vars
	function hotDownloadManifest() {
		var filename = require("path").join(__dirname, $hotMainFilename$);
		return new Promise(function(resolve, reject) {
			require("fs").readFile(filename, "utf-8", function(err, content) {
				if (err) return resolve();
				try {
					var update = JSON.parse(content);
				} catch (e) {
					return reject(e);
				}
				resolve(update);
			});
		});
	}

	// eslint-disable-next-line no-unused-vars
	function hotDisposeChunk(chunkId) {
		delete installedChunks[chunkId];
	}
};
