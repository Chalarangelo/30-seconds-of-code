/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function getImportPrefix(loaderContext, query) {
	if(query.importLoaders === false)
		return "";
	var importLoaders = parseInt(query.importLoaders, 10) || 0;
	var loadersRequest = loaderContext.loaders.slice(
		loaderContext.loaderIndex,
		loaderContext.loaderIndex + 1 + importLoaders
	).map(function(x) { return x.request; }).join("!");
	return "-!" + loadersRequest + "!";
};
