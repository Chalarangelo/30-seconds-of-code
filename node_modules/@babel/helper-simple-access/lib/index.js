"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = simplifyAccess;

function t() {
  const data = _interopRequireWildcard(require("@babel/types"));

  t = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function simplifyAccess(path, bindingNames) {
  path.traverse(simpleAssignmentVisitor, {
    scope: path.scope,
    bindingNames,
    seen: new WeakSet()
  });
}

const simpleAssignmentVisitor = {
  UpdateExpression: {
    exit(path) {
      const {
        scope,
        bindingNames
      } = this;
      const arg = path.get("argument");
      if (!arg.isIdentifier()) return;
      const localName = arg.node.name;
      if (!bindingNames.has(localName)) return;

      if (scope.getBinding(localName) !== path.scope.getBinding(localName)) {
        return;
      }

      if (path.parentPath.isExpressionStatement() && !path.isCompletionRecord()) {
        const operator = path.node.operator == "++" ? "+=" : "-=";
        path.replaceWith(t().assignmentExpression(operator, arg.node, t().numericLiteral(1)));
      } else if (path.node.prefix) {
        path.replaceWith(t().assignmentExpression("=", t().identifier(localName), t().binaryExpression(path.node.operator[0], t().unaryExpression("+", arg.node), t().numericLiteral(1))));
      } else {
        const old = path.scope.generateUidIdentifierBasedOnNode(arg.node, "old");
        const varName = old.name;
        path.scope.push({
          id: old
        });
        const binary = t().binaryExpression(path.node.operator[0], t().identifier(varName), t().numericLiteral(1));
        path.replaceWith(t().sequenceExpression([t().assignmentExpression("=", t().identifier(varName), t().unaryExpression("+", arg.node)), t().assignmentExpression("=", t().cloneNode(arg.node), binary), t().identifier(varName)]));
      }
    }

  },
  AssignmentExpression: {
    exit(path) {
      const {
        scope,
        seen,
        bindingNames
      } = this;
      if (path.node.operator === "=") return;
      if (seen.has(path.node)) return;
      seen.add(path.node);
      const left = path.get("left");
      if (!left.isIdentifier()) return;
      const localName = left.node.name;
      if (!bindingNames.has(localName)) return;

      if (scope.getBinding(localName) !== path.scope.getBinding(localName)) {
        return;
      }

      path.node.right = t().binaryExpression(path.node.operator.slice(0, -1), t().cloneNode(path.node.left), path.node.right);
      path.node.operator = "=";
    }

  }
};