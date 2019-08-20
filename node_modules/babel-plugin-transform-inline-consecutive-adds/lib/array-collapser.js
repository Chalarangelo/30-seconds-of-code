"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Collapser = require("./collapser");

var ArrayCollapser = function (_Collapser) {
  _inherits(ArrayCollapser, _Collapser);

  function ArrayCollapser() {
    _classCallCheck(this, ArrayCollapser);

    return _possibleConstructorReturn(this, (ArrayCollapser.__proto__ || Object.getPrototypeOf(ArrayCollapser)).apply(this, arguments));
  }

  _createClass(ArrayCollapser, [{
    key: "isInitTypeValid",
    value: function isInitTypeValid(init) {
      return init.isArrayExpression();
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
        // foo.push(rval1, ...nrvals)

        var callee = expr.get("callee");

        if (!callee.isMemberExpression()) {
          return false;
        }

        var obj = callee.get("object"),
            prop = callee.get("property");
        if (!obj.isIdentifier() || obj.node.name !== objName || !prop.isIdentifier() || prop.node.name !== "push") {
          return false;
        }

        var args = expr.get("arguments");
        if (args.some(checkReference)) {
          return false;
        }
        return true;
      };
    }
  }, {
    key: "extractAssignment",
    value: function extractAssignment(expr) {
      return expr.node.arguments;
    }
  }, {
    key: "addSuccessfully",
    value: function addSuccessfully(t, args, init) {
      args.map(function (a) {
        return init.elements.push(a);
      });
      return true;
    }
  }]);

  return ArrayCollapser;
}(Collapser);

module.exports = ArrayCollapser;