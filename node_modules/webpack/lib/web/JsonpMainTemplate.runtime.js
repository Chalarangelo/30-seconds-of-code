/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals hotAddUpdateChunk parentHotUpdateCallback document XMLHttpRequest $require$ $hotChunkFilename$ $hotMainFilename$ $crossOriginLoading$ */
module.exports = function() {
	// eslint-disable-next-line no-unused-vars
	function webpackHotUpdateCallback(chunkId, moreModules) {
		hotAddUpdateChunk(chunkId, moreModules);
		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
	} //$semicolon

	// eslint-disable-next-line no-unused-vars
	function hotDownloadUpdateChunk(chunkId) {
		var script = document.createElement("script");
		script.charset = "utf-8";
		script.src = $require$.p + $hotChunkFilename$;
		if ($crossOriginLoading$) script.crossOrigin = $crossOriginLoading$;
		document.head.appendChild(script);
	}

	// eslint-disable-next-line no-unused-vars
	function hotDownloadManifest(requestTimeout) {
		requestTimeout = requestTimeout || 10000;
		return new Promise(function(resolve, reject) {
			if (typeof XMLHttpRequest === "undefined") {
				return reject(new Error("No browser support"));
			}
			try {
				var request = new XMLHttpRequest();
				var requestPath = $require$.p + $hotMainFilename$;
				request.open("GET", requestPath, true);
				request.timeout = requestTimeout;
				request.send(null);
			} catch (err) {
				return reject(err);
			}
			request.onreadystatechange = function() {
				if (request.readyState !== 4) return;
				if (request.status === 0) {
					// timeout
					reject(
						new Error("Manifest request to " + requestPath + " timed out.")
					);
				} else if (request.status === 404) {
					// no update available
					resolve();
				} else if (request.status !== 200 && request.status !== 304) {
					// other failure
					reject(new Error("Manifest request to " + requestPath + " failed."));
				} else {
					// success
					try {
						var update = JSON.parse(request.responseText);
					} catch (e) {
						reject(e);
						return;
					}
					resolve(update);
				}
			};
		});
	}
};
