'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Global = exports.Config = exports.Circus = void 0;

var Circus = _interopRequireWildcard(require('./Circus'));

exports.Circus = Circus;

var Config = _interopRequireWildcard(require('./Config'));

exports.Config = Config;

var Global = _interopRequireWildcard(require('./Global'));

exports.Global = Global;

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}
