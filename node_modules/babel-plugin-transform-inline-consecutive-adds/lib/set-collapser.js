"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Collapser = require("./collapser");

var SetCollapser = function (_Collapser) {
  _inherits(SetCollapser, _Collapser);

  function SetCollapser() {
    _classCallCheck(this, SetCollapser);

    return _possibleConstructorReturn(this, (SetCollapser.__proto__ || Object.getPrototypeOf(SetCollapser)).apply(this, arguments));
  }

  _createClass(SetCollapser, [{
    key: "isInitTypeValid",
    value: function isInitTypeValid(init) {
      return init.isNewExpression() && init.get("callee").isIdentifier() && init.node.callee.name === "Set" && (
      // other iterables might not be append-able
      init.node.arguments.length === 0 || init.node.arguments.length === 1 && init.get("arguments")[0].isArrayExpression());
    }
  }, {
    key: "isExpressionTypeValid",
    value: function isExpressionTypeValid(expr) {
      return expr.isCallExpression();
    }
  }, {
    key: "getExpressionChecker",
    value: function getExpressionChecker(objName, checkReference) {
      return function (expr) {
        // checks expr is of form:
        // foo.add(rval)

        var callee = expr.get("callee");

        if (!callee.isMemberExpression()) {
          return false;
        }

        var obj = callee.get("object"),
            prop = callee.get("property");
        if (!obj.isIdentifier() || obj.node.name !== objName || !prop.isIdentifier() || prop.node.name !== "add") {
          return false;
        }

        var args = expr.get("arguments");
        if (args.length !== 1) {
          return false;
        }
        if (checkReference(args[0])) {
          return false;
        }
        return true;
      };
    }
  }, {
    key: "extractAssignment",
    value: function extractAssignment(expr) {
      return expr.node.arguments[0];
    }
  }, {
    key: "addSuccessfully",
    value: function addSuccessfully(t, arg, init) {
      if (init.arguments.length === 0) {
        init.arguments.push(t.arrayExpression());
      }
      init.arguments[0].elements.push(arg);
      return true;
    }
  }]);

  return SetCollapser;
}(Collapser);

module.exports = SetCollapser;