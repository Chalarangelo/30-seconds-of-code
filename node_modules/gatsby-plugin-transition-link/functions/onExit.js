"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.onExit = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var onExit = function onExit(_ref) {
  var node = _ref.node,
      inTransition = _ref.inTransition,
      exitTrigger = _ref.exitTrigger,
      entryProps = _ref.entryProps,
      exitProps = _ref.exitProps,
      triggerResolve = _ref.triggerResolve,
      e = _ref.e;
  if (!inTransition) return;
  var removed = exitProps.trigger,
      exitPropsTrimmed = (0, _objectWithoutPropertiesLoose2.default)(exitProps, ["trigger"]);
  triggerResolve.exit((0, _extends2.default)({}, exitPropsTrimmed, {
    node: node
  }));
  return exitTrigger && typeof exitTrigger === "function" && exitTrigger({
    entry: entryProps,
    exit: exitProps,
    node: node,
    e: e
  });
};

exports.onExit = onExit;