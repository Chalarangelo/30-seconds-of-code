"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotImplementedError = Error("NotImplementedError");

var Collapser = function () {
  function Collapser() {
    _classCallCheck(this, Collapser);
  }

  _createClass(Collapser, [{
    key: "isInitTypeValid",
    value: function isInitTypeValid() {
      throw NotImplementedError;
    }
  }, {
    key: "isExpressionTypeValid",
    value: function isExpressionTypeValid() {
      throw NotImplementedError;
    }
  }, {
    key: "getExpressionChecker",
    value: function getExpressionChecker() {
      throw NotImplementedError;
    }
  }, {
    key: "extractAssignment",
    value: function extractAssignment() {
      throw NotImplementedError;
    }
  }, {
    key: "addSuccessfully",
    value: function addSuccessfully() {
      throw NotImplementedError;
    }
  }, {
    key: "isSizeSmaller",
    value: function isSizeSmaller() {
      return true;
    }
  }]);

  return Collapser;
}();

module.exports = Collapser;