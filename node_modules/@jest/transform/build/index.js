'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
Object.defineProperty(exports, 'ScriptTransformer', {
  enumerable: true,
  get: function get() {
    return _ScriptTransformer.default;
  }
});
Object.defineProperty(exports, 'shouldInstrument', {
  enumerable: true,
  get: function get() {
    return _shouldInstrument.default;
  }
});
Object.defineProperty(exports, 'Transformer', {
  enumerable: true,
  get: function get() {
    return _types.Transformer;
  }
});
Object.defineProperty(exports, 'ShouldInstrumentOptions', {
  enumerable: true,
  get: function get() {
    return _types.ShouldInstrumentOptions;
  }
});
Object.defineProperty(exports, 'TransformationOptions', {
  enumerable: true,
  get: function get() {
    return _types.Options;
  }
});

var _ScriptTransformer = _interopRequireDefault(require('./ScriptTransformer'));

var _shouldInstrument = _interopRequireDefault(require('./shouldInstrument'));

var _types = require('./types');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
