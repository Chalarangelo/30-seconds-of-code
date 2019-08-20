"use strict";

exports.__esModule = true;
exports.default = getPagesPromises;

function getPagesPromises() {
  var exitResolve;
  var exitPromise = new Promise(function (resolve) {
    exitResolve = resolve;
  });
  var entryResolve;
  var entryPromise = new Promise(function (resolve) {
    entryResolve = resolve;
  });
  return {
    triggerResolve: {
      entry: entryResolve,
      exit: exitResolve
    },
    pages: {
      exit: exitPromise,
      entry: entryPromise
    }
  };
}