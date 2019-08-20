"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Collapser = require("./collapser");

var ObjectCollapser = function (_Collapser) {
  _inherits(ObjectCollapser, _Collapser);

  function ObjectCollapser() {
    _classCallCheck(this, ObjectCollapser);

    return _possibleConstructorReturn(this, (ObjectCollapser.__proto__ || Object.getPrototypeOf(ObjectCollapser)).apply(this, arguments));
  }

  _createClass(ObjectCollapser, [{
    key: "isInitTypeValid",
    value: function isInitTypeValid(init) {
      return init.isObjectExpression();
    }
  }, {
    key: "isExpressionTypeValid",
    value: function isExpressionTypeValid(expr) {
      return expr.isAssignmentExpression();
    }
  }, {
    key: "getExpressionChecker",
    value: function getExpressionChecker(objName, checkReference) {
      return function (expr) {
        // checks expr is of form:
        // foo.a = rval | foo[a] = rval

        var left = expr.get("left");
        if (!left.isMemberExpression()) {
          return false;
        }

        var obj = left.get("object"),
            prop = left.get("property");
        if (!obj.isIdentifier() || obj.node.name !== objName) {
          return false;
        }
        if (!prop.isIdentifier() && checkReference(prop)) {
          return false;
        }
        if (left.node.computed && !(prop.isStringLiteral() || prop.isNumericLiteral())) {
          return false;
        }

        var right = expr.get("right");
        if (checkReference(right)) {
          return false;
        }

        return true;
      };
    }
  }, {
    key: "extractAssignment",
    value: function extractAssignment(expr) {
      return [expr.node.left.property, expr.node.right];
    }
  }, {
    key: "addSuccessfully",
    value: function addSuccessfully(t, _ref, init) {
      var _ref2 = _slicedToArray(_ref, 2),
          left = _ref2[0],
          right = _ref2[1];

      init.properties.push(t.objectProperty(left, right));
      return true;
    }
  }]);

  return ObjectCollapser;
}(Collapser);

module.exports = ObjectCollapser;