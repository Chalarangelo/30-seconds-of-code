"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visitor = void 0;

function _core() {
  const data = require("@babel/core");

  _core = function () {
    return data;
  };

  return data;
}

function getTDZStatus(refPath, bindingPath) {
  const executionStatus = bindingPath._guessExecutionStatusRelativeTo(refPath);

  if (executionStatus === "before") {
    return "inside";
  } else if (executionStatus === "after") {
    return "outside";
  } else {
    return "maybe";
  }
}

function buildTDZAssert(node, state) {
  return _core().types.callExpression(state.addHelper("temporalRef"), [node, _core().types.stringLiteral(node.name)]);
}

function isReference(node, scope, state) {
  const declared = state.letReferences[node.name];
  if (!declared) return false;
  return scope.getBindingIdentifier(node.name) === declared;
}

const visitor = {
  ReferencedIdentifier(path, state) {
    if (!state.tdzEnabled) return;
    const {
      node,
      parent,
      scope
    } = path;
    if (path.parentPath.isFor({
      left: node
    })) return;
    if (!isReference(node, scope, state)) return;
    const bindingPath = scope.getBinding(node.name).path;
    if (bindingPath.isFunctionDeclaration()) return;
    const status = getTDZStatus(path, bindingPath);
    if (status === "inside") return;

    if (status === "maybe") {
      const assert = buildTDZAssert(node, state);
      bindingPath.parent._tdzThis = true;
      path.skip();

      if (path.parentPath.isUpdateExpression()) {
        if (parent._ignoreBlockScopingTDZ) return;
        path.parentPath.replaceWith(_core().types.sequenceExpression([assert, parent]));
      } else {
        path.replaceWith(assert);
      }
    } else if (status === "outside") {
      path.replaceWith(_core().types.throwStatement(_core().types.inherits(_core().types.newExpression(_core().types.identifier("ReferenceError"), [_core().types.stringLiteral(`${node.name} is not defined - temporal dead zone`)]), node)));
    }
  },

  AssignmentExpression: {
    exit(path, state) {
      if (!state.tdzEnabled) return;
      const {
        node
      } = path;
      if (node._ignoreBlockScopingTDZ) return;
      const nodes = [];
      const ids = path.getBindingIdentifiers();

      for (const name of Object.keys(ids)) {
        const id = ids[name];

        if (isReference(id, path.scope, state)) {
          nodes.push(buildTDZAssert(id, state));
        }
      }

      if (nodes.length) {
        node._ignoreBlockScopingTDZ = true;
        nodes.push(node);
        path.replaceWithMultiple(nodes.map(_core().types.expressionStatement));
      }
    }

  }
};
exports.visitor = visitor;