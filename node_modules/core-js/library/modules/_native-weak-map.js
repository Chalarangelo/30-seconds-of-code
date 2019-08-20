var nativeFunctionToString = require('./_function-to-string');
var WeakMap = require('./_global').WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(nativeFunctionToString.call(WeakMap));
