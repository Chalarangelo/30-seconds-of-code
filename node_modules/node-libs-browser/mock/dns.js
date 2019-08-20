exports.lookup = exports.resolve4 =
exports.resolve6 = exports.resolveCname =
exports.resolveMx = exports.resolveNs =
exports.resolveTxt = exports.resolveSrv =
exports.resolveNaptr = exports.reverse =
exports.resolve =
function () {
  if (!arguments.length) return;

  var callback = arguments[arguments.length - 1];
  if (callback && typeof callback === 'function') {
    callback(null, '0.0.0.0')
  }
}

