"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.function.bind");

require("core-js/modules/es6.promise");

var promisify = function promisify(fun, ctx) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return new Promise(function (resolve, reject) {
    args.push(function (err, data) {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
    fun.bind(ctx).apply(void 0, args);
  });
};

var _default = promisify;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=promisify.js.map