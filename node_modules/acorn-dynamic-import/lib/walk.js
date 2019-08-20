Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inject = inject;

var _walk = require('acorn/dist/walk');

var walk = _interopRequireWildcard(_walk);

var _inject = require('./inject');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function inject(injectableWalk) {
  return Object.assign({}, injectableWalk, {
    base: Object.assign({}, injectableWalk.base, _defineProperty({}, _inject.DynamicImportKey, function () {}))
  });
}

exports['default'] = inject(walk);