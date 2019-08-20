'use strict';

const ErrorStackParser = require('error-stack-parser');
const RequestShortener = require("webpack/lib/RequestShortener");

// TODO: allow the location to be customized in options
const requestShortener = new RequestShortener(process.cwd());

/*
 This logic is mostly duplicated from webpack/lib/Stats.js#toJson()
 See: https://github.com/webpack/webpack/blob/2f618e733aab4755deb42e9d8e859609005607c0/lib/Stats.js#L89
*/

function extractError (e) {
  return {
    message: e.message,
    file: getFile(e),
    origin: getOrigin(e),
    name: e.name,
    severity: 0,
    webpackError: e,
    originalStack: getOriginalErrorStack(e)
  };
}

function getOriginalErrorStack(e) {
  while (e.error != null) {
    e = e.error;
  }
  if (e.stack) {
    return ErrorStackParser.parse(e);
  }
  return [];
}

function getFile (e) {
  if (e.file) {
    return e.file;
  } else if (e.module && e.module.readableIdentifier && typeof e.module.readableIdentifier === "function") {
    return e.module.readableIdentifier(requestShortener);
  }
}

function getOrigin (e) {
  let origin = '';
  if (e.dependencies && e.origin) {
    origin += '\n @ ' + e.origin.readableIdentifier(requestShortener);
    e.dependencies.forEach(function (dep) {
      if (!dep.loc) return;
      if (typeof dep.loc === "string") return;
      if (!dep.loc.start) return;
      if (!dep.loc.end) return;
      origin += ' ' + dep.loc.start.line + ':' + dep.loc.start.column + '-' +
        (dep.loc.start.line !== dep.loc.end.line ? dep.loc.end.line + ':' : '') + dep.loc.end.column;
    });
    var current = e.origin;
    while (current.issuer && typeof current.issuer.readableIdentifier === 'function') {
      current = current.issuer;
      origin += '\n @ ' + current.readableIdentifier(requestShortener);
    }
  }
  return origin;
}

module.exports = extractError;
