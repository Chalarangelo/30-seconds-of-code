"use strict";

exports.__esModule = true;
exports.withBasePath = withBasePath;
exports.withTrailingSlash = withTrailingSlash;
exports.getCommonDir = getCommonDir;

const path = require(`path`);

const {
  joinPath
} = require(`gatsby-core-utils`);

function withBasePath(basePath) {
  return (...paths) => joinPath(basePath, ...paths);
}

function withTrailingSlash(basePath) {
  return `${basePath}/`;
}

const posixJoinWithLeadingSlash = paths => path.posix.join(...paths.map((segment, index) => segment === `` && index === 0 ? `/` : segment));

function getCommonDir(path1, path2) {
  const path1Segments = path1.split(/[/\\]/);
  const path2Segments = path2.split(/[/\\]/);

  for (let i = 0; i < path1Segments.length; i++) {
    if (i >= path2Segments.length) {
      return posixJoinWithLeadingSlash(path2Segments);
    } else if (path1Segments[i].toLowerCase() !== path2Segments[i].toLowerCase()) {
      const joined = path1Segments.slice(0, i);
      return posixJoinWithLeadingSlash(joined);
    }
  }

  return posixJoinWithLeadingSlash(path1Segments);
}
//# sourceMappingURL=path.js.map