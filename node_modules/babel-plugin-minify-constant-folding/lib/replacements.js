"use strict";

var FALLBACK_HANDLER = Symbol("fallback handler");

module.exports = function (_ref) {
  var t = _ref.types;

  var undef = t.unaryExpression("void", t.numericLiteral(0));

  function isUndef(ob) {
    return ob === undefined || t.isIdentifier(ob, { name: "undefined" }) || t.isUnaryExpression(ob, { operator: "void" });
  }

  function defaultZero(cb) {
    return function () {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : t.numericLiteral(0);

      if (t.isNumericLiteral(i)) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return cb.call.apply(cb, [this.node, this.node, i.value].concat(args));
      }
    };
  }

  function hasSpread(node) {
    return node.elements.some(function (el) {
      return t.isSpreadElement(el);
    });
  }

  return {
    ArrayExpression: {
      canReplace() {
        return !hasSpread(this.node);
      },
      members: {
        length() {
          if (hasSpread(this.node)) {
            return;
          }
          return t.numericLiteral(this.node.elements.length);
        },
        [FALLBACK_HANDLER](i) {
          if (hasSpread(this.node)) {
            return;
          }
          if (typeof i === "number" || i.match(/^\d+$/)) {
            return this.node.elements[i] || undef;
          }
        }
      },
      calls: {
        join() {
          var sep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : t.stringLiteral(",");

          if (!t.isStringLiteral(sep)) return;
          var bad = false;
          var str = this.get("elements").map(function (el) {
            var evaled = el.evaluate();
            if (!evaled.confident) {
              bad = true;
              return;
            }
            return evaled.value;
          }).join(sep.value);
          return bad ? void 0 : t.stringLiteral(str);
        },
        push() {
          return t.numericLiteral(this.node.elements.length + arguments.length);
        },
        shift() {
          if (this.node.elements.length === 0) {
            return undef;
          }
          return t.numericLiteral(this.node.elements.length - 1);
        },
        slice() {
          var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : t.numericLiteral(0);
          var end = arguments[1];

          if (!t.isNumericLiteral(start) || end && !t.isNumericLiteral(end)) {
            return;
          }
          return t.arrayExpression(this.node.elements.slice(start.value, end && end.value));
        },
        pop() {
          return this.node.elements[this.node.elements.length - 1] || undef;
        },
        reverse() {
          return t.arrayExpression(this.node.elements.reverse());
        },
        splice(start, end) {
          var _node$elements$slice;

          if (!t.isNumericLiteral(start) || end && !t.isNumericLiteral(end)) {
            return;
          }

          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          if (end) {
            args.unshift(end.value);
          }
          return t.arrayExpression((_node$elements$slice = this.node.elements.slice()).splice.apply(_node$elements$slice, [start.value].concat(args)));
        }
      }
    },
    StringLiteral: {
      members: {
        length() {
          return t.numericLiteral(this.node.value.length);
        },
        [FALLBACK_HANDLER](i) {
          if (typeof i === "number" || i.match(/^\d+$/)) {
            var ch = this.node.value[i];
            return ch ? t.stringLiteral(ch) : undef;
          }
        }
      },
      calls: {
        split() {
          var sep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undef;

          var realSep = null;
          if (t.isStringLiteral(sep)) {
            realSep = sep.value;
          }
          if (isUndef(sep)) {
            realSep = sep;
          }
          if (realSep !== null) {
            return t.arrayExpression(this.node.value.split(realSep).map(function (str) {
              return t.stringLiteral(str);
            }));
          }
        },
        charAt: defaultZero(function (_ref2, i) {
          var value = _ref2.value;
          return t.stringLiteral(value.charAt(i));
        }),
        charCodeAt: defaultZero(function (_ref3, i) {
          var value = _ref3.value;
          return t.numericLiteral(value.charCodeAt(i));
        }),
        codePointAt: defaultZero(function (_ref4, i) {
          var value = _ref4.value;
          return t.numericLiteral(value.codePointAt(i));
        })
      }
    }
  };
};
module.exports.FALLBACK_HANDLER = FALLBACK_HANDLER;