/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

function addAttrs (element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

module.exports = function addStyleUrl (url, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	options.hmr = typeof options.hmr === 'undefined' ? true : options.hmr;

	var link = document.createElement("link");

	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = url;

	addAttrs(link, options.attrs);

	var head = document.getElementsByTagName("head")[0];

	head.appendChild(link);

	if (options.hmr && module.hot) {
		return function(url) {
			if(typeof url === "string") {
				link.href = url;
			} else {
				head.removeChild(link);
			}
		};
	}
}
