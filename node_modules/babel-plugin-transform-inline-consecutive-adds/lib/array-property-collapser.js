"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Collapser = require("./collapser");

var ArrayPropertyCollapser = function (_Collapser) {
  _inherits(ArrayPropertyCollapser, _Collapser);

  function ArrayPropertyCollapser() {
    _classCallCheck(this, ArrayPropertyCollapser);

    return _possibleConstructorReturn(this, (ArrayPropertyCollapser.__proto__ || Object.getPrototypeOf(ArrayPropertyCollapser)).apply(this, arguments));
  }

  _createClass(ArrayPropertyCollapser, [{
    key: "isInitTypeValid",
    value: function isInitTypeValid(init) {
      return init.isArrayExpression();
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
        // foo[num] = rval

        var left = expr.get("left");

        if (!left.isMemberExpression()) {
          return false;
        }

        var obj = left.get("object"),
            prop = left.get("property");
        if (!obj.isIdentifier() || obj.node.name !== objName) {
          return false;
        }

        var checkIndex = function checkIndex(num) {
          return Number.isInteger(num) && num >= 0;
        };

        if (!(prop.isNumericLiteral() || prop.isStringLiteral()) || !checkIndex(Number(prop.node.value))) {
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
      return [expr.node.left.property.value, expr.get("right")];
    }
  }, {
    key: "addSuccessfully",
    value: function addSuccessfully(t, _ref, init) {
      var _ref2 = _slicedToArray(_ref, 2),
          index = _ref2[0],
          rval = _ref2[1];

      var elements = init.elements;
      for (var i = elements.length; i <= index; i++) {
        elements.push(null);
      }
      if (elements[index] !== null) {
        return false;
      }
      elements[index] = rval.node;
      return true;
    }
  }, {
    key: "isSizeSmaller",
    value: function isSizeSmaller(_ref3) {
      var newInit = _ref3.newInit,
          oldInit = _ref3.oldInit,
          varDecl = _ref3.varDecl,
          assignments = _ref3.assignments,
          statements = _ref3.statements;

      var anyUndefined = function anyUndefined(args) {
        return args.some(function (a) {
          return a === undefined;
        });
      };

      // We make an inexact calculation of how much space we save.
      // It's inexact because we don't know how whitespaces will get minimized,
      // and other factors.
      if (anyUndefined([statements[statements.length - 1].node.end, varDecl.node.end])) {
        return false;
      }
      var statementsLength = statements[statements.length - 1].node.end - varDecl.node.end;

      // Approx. formula of the change in `init`'s length =
      // (# commas added) + (size of all the new rvals added), where
      // # commas added = (difference between the lengths of the old and new arrays)

      var numCommaAdded = newInit.elements.length - oldInit.elements.length;
      if (anyUndefined(assignments.map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            rval = _ref5[1];

        return rval.node.end;
      })) || anyUndefined(assignments.map(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            rval = _ref7[1];

        return rval.node.start;
      }))) {
        return false;
      }
      var sizeOfRvals = assignments.map(function (_ref8) {
        var _ref9 = _slicedToArray(_ref8, 2),
            rval = _ref9[1];

        return rval.node.end - rval.node.start + 1;
      }).reduce(function (a, b) {
        return a + b;
      }, 0); // add 1 for space in front // sum

      return numCommaAdded + sizeOfRvals < statementsLength;
    }
  }]);

  return ArrayPropertyCollapser;
}(Collapser);

module.exports = ArrayPropertyCollapser;