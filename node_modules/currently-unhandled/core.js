'use strict';
var arrayFindIndex = require('array-find-index');

module.exports = function () {
	var unhandledRejections = [];

	function onUnhandledRejection(reason, promise) {
		unhandledRejections.push({reason: reason, promise: promise});
	}

	function onRejectionHandled(promise) {
		var index = arrayFindIndex(unhandledRejections, function (x) {
			return x.promise === promise;
		});

		unhandledRejections.splice(index, 1);
	}

	function currentlyUnhandled() {
		return unhandledRejections.map(function (entry) {
			return {
				reason: entry.reason,
				promise: entry.promise
			};
		});
	}

	return {
		onUnhandledRejection: onUnhandledRejection,
		onRejectionHandled: onRejectionHandled,
		currentlyUnhandled: currentlyUnhandled
	};
};
