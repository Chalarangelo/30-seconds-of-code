"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _helperPluginUtils() {
  const data = require("@babel/helper-plugin-utils");

  _helperPluginUtils = function () {
    return data;
  };

  return data;
}

function _core() {
  const data = require("@babel/core");

  _core = function () {
    return data;
  };

  return data;
}

var _default = (0, _helperPluginUtils().declare)((api, options) => {
  api.assertVersion(7);
  const {
    loose
  } = options;
  let helperName = "taggedTemplateLiteral";
  if (loose) helperName += "Loose";

  function buildConcatCallExpressions(items) {
    let avail = true;
    return items.reduce(function (left, right) {
      let canBeInserted = _core().types.isLiteral(right);

      if (!canBeInserted && avail) {
        canBeInserted = true;
        avail = false;
      }

      if (canBeInserted && _core().types.isCallExpression(left)) {
        left.arguments.push(right);
        return left;
      }

      return _core().types.callExpression(_core().types.memberExpression(left, _core().types.identifier("concat")), [right]);
    });
  }

  return {
    name: "transform-template-literals",
    visitor: {
      TaggedTemplateExpression(path) {
        const {
          node
        } = path;
        const {
          quasi
        } = node;
        const strings = [];
        const raws = [];
        let isStringsRawEqual = true;

        for (const elem of quasi.quasis) {
          const {
            raw,
            cooked
          } = elem.value;
          const value = cooked == null ? path.scope.buildUndefinedNode() : _core().types.stringLiteral(cooked);
          strings.push(value);
          raws.push(_core().types.stringLiteral(raw));

          if (raw !== cooked) {
            isStringsRawEqual = false;
          }
        }

        const scope = path.scope.getProgramParent();
        const templateObject = scope.generateUidIdentifier("templateObject");
        const helperId = this.addHelper(helperName);
        const callExpressionInput = [_core().types.arrayExpression(strings)];

        if (!isStringsRawEqual) {
          callExpressionInput.push(_core().types.arrayExpression(raws));
        }

        const lazyLoad = _core().template.ast`
          function ${templateObject}() {
            const data = ${_core().types.callExpression(helperId, callExpressionInput)};
            ${templateObject} = function() { return data };
            return data;
          } 
        `;
        scope.path.unshiftContainer("body", lazyLoad);
        path.replaceWith(_core().types.callExpression(node.tag, [_core().types.callExpression(_core().types.cloneNode(templateObject), []), ...quasi.expressions]));
      },

      TemplateLiteral(path) {
        const nodes = [];
        const expressions = path.get("expressions");
        let index = 0;

        for (const elem of path.node.quasis) {
          if (elem.value.cooked) {
            nodes.push(_core().types.stringLiteral(elem.value.cooked));
          }

          if (index < expressions.length) {
            const expr = expressions[index++];
            const node = expr.node;

            if (!_core().types.isStringLiteral(node, {
              value: ""
            })) {
              nodes.push(node);
            }
          }
        }

        const considerSecondNode = !loose || !_core().types.isStringLiteral(nodes[1]);

        if (!_core().types.isStringLiteral(nodes[0]) && considerSecondNode) {
          nodes.unshift(_core().types.stringLiteral(""));
        }

        let root = nodes[0];

        if (loose) {
          for (let i = 1; i < nodes.length; i++) {
            root = _core().types.binaryExpression("+", root, nodes[i]);
          }
        } else if (nodes.length > 1) {
          root = buildConcatCallExpressions(nodes);
        }

        path.replaceWith(root);
      }

    }
  };
});

exports.default = _default;