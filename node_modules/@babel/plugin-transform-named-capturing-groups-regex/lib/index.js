"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _regexpTree() {
  const data = _interopRequireDefault(require("regexp-tree"));

  _regexpTree = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default({
  types: t
}, options) {
  const {
    runtime = true
  } = options;

  if (typeof runtime !== "boolean") {
    throw new Error("The 'runtime' option must be boolean");
  }

  return {
    name: "transform-named-capturing-groups-regex",
    visitor: {
      RegExpLiteral(path) {
        const node = path.node;

        if (node.pattern.indexOf("(?<") === -1) {
          return;
        }

        const result = _regexpTree().default.compatTranspile(node.extra.raw, ["namedCapturingGroups"]);

        const {
          namedCapturingGroups
        } = result.getExtra();

        if (namedCapturingGroups && Object.keys(namedCapturingGroups).length > 0) {
          node.pattern = result.getSource();

          if (runtime && !isRegExpTest(path)) {
            path.replaceWith(t.callExpression(this.addHelper("wrapRegExp"), [node, t.valueToNode(namedCapturingGroups)]));
          }
        }
      }

    }
  };
}

function isRegExpTest(path) {
  return path.parentPath.isMemberExpression({
    object: path.node,
    computed: false
  }) && path.parentPath.get("property").isIdentifier({
    name: "test"
  });
}