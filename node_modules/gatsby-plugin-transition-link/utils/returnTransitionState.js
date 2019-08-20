"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.returnTransitionState = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

require("polyfill-array-includes");

var returnTransitionState = function returnTransitionState(_ref) {
  var location = _ref.location,
      transitionIdHistory = _ref.transitionIdHistory,
      inTransition = _ref.inTransition,
      transitionState = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["location", "transitionIdHistory", "inTransition"]);
  if (inTransition) return transitionState;
  var currentId = location.state && location.state.transitionId ? location.state.transitionId : false;
  var historyWithoutLast = transitionIdHistory.slice(0, -1);

  if (currentId && historyWithoutLast.includes(currentId)) {
    return {
      transitionStatus: "POP",
      entry: {
        state: {},
        delay: 0,
        length: 0
      },
      exit: {
        state: {},
        delay: 0,
        length: 0
      }
    };
  }

  return transitionState;
};

exports.returnTransitionState = returnTransitionState;