"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _hyphenate = _interopRequireDefault(require("../util/hyphenate"));

var _style = _interopRequireDefault(require("../style"));

var _on = _interopRequireDefault(require("../events/on"));

var _off = _interopRequireDefault(require("../events/off"));

var _properties = _interopRequireDefault(require("./properties"));

var _isTransform = _interopRequireDefault(require("./isTransform"));

var reset = {};
reset[_properties.default.property] = reset[_properties.default.duration] = reset[_properties.default.delay] = reset[_properties.default.timing] = ''; // super lean animate function for transitions
// doesn't support all translations to keep it matching the jquery API

/**
 * code in part from: Zepto 1.1.4 | zeptojs.com/license
 */

function _animate(_ref) {
  var node = _ref.node,
      properties = _ref.properties,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 200 : _ref$duration,
      easing = _ref.easing,
      callback = _ref.callback;
  var cssProperties = [],
      fakeEvent = {
    target: node,
    currentTarget: node
  },
      cssValues = {},
      transforms = '',
      fired;
  if (!_properties.default.end) duration = 0;
  Object.keys(properties).forEach(function (key) {
    if ((0, _isTransform.default)(key)) transforms += key + "(" + properties[key] + ") ";else {
      cssValues[key] = properties[key];
      cssProperties.push((0, _hyphenate.default)(key));
    }
  });

  if (transforms) {
    cssValues[_properties.default.transform] = transforms;
    cssProperties.push(_properties.default.transform);
  }

  if (duration > 0) {
    cssValues[_properties.default.property] = cssProperties.join(', ');
    cssValues[_properties.default.duration] = duration / 1000 + 's';
    cssValues[_properties.default.delay] = 0 + 's';
    cssValues[_properties.default.timing] = easing || 'linear';
    (0, _on.default)(node, _properties.default.end, done);
    setTimeout(function () {
      if (!fired) done(fakeEvent);
    }, duration + 500);
  } //eslint-disable-next-line no-unused-expressions


  node.clientLeft; // trigger page reflow

  (0, _style.default)(node, cssValues);
  if (duration <= 0) setTimeout(done.bind(null, fakeEvent), 0);
  return {
    cancel: function cancel() {
      if (fired) return;
      fired = true;
      (0, _off.default)(node, _properties.default.end, done);
      (0, _style.default)(node, reset);
    }
  };

  function done(event) {
    if (event.target !== event.currentTarget) return;
    fired = true;
    (0, _off.default)(event.target, _properties.default.end, done);
    (0, _style.default)(node, reset);
    callback && callback.call(this);
  }
}

function animate(node, properties, duration, easing, callback) {
  if (arguments.length === 1 && typeof node === 'object') {
    return _animate(node);
  }

  if (typeof easing === 'function') {
    callback = easing;
    easing = null;
  }

  return _animate({
    node: node,
    properties: properties,
    duration: duration,
    easing: easing,
    callback: callback
  });
}

var _default = animate;
exports.default = _default;
module.exports = exports["default"];