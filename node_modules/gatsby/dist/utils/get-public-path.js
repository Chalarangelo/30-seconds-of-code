"use strict";

const trimSlashes = part => part.replace(/(^\/)|(\/$)/g, ``);

const isURL = possibleUrl => [`http://`, `https://`, `//`].some(expr => possibleUrl.startsWith(expr));

module.exports = function getPublicPath({
  assetPrefix,
  pathPrefix,
  prefixPaths
}) {
  if (prefixPaths && (assetPrefix || pathPrefix)) {
    const normalized = [assetPrefix, pathPrefix].filter(part => part && part.length > 0).map(part => trimSlashes(part)).join(`/`);
    return isURL(normalized) ? normalized : `/${normalized}`;
  }

  return ``;
};
//# sourceMappingURL=get-public-path.js.map