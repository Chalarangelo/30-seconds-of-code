"use strict";

exports.__esModule = true;
exports.useTransitionState = void 0;

var _react = require("react");

var _createTransitionContext = require("../context/createTransitionContext");

var useTransitionState = function useTransitionState() {
  return (0, _react.useContext)(_createTransitionContext.publicContext);
};

exports.useTransitionState = useTransitionState;