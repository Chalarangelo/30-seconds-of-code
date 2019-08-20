"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function t() {
  const data = _interopRequireWildcard(require("@babel/types"));

  t = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const visitor = {
  Scope(path, state) {
    if (state.kind === "let") path.skip();
  },

  Function(path) {
    path.skip();
  },

  VariableDeclaration(path, state) {
    if (state.kind && path.node.kind !== state.kind) return;
    const nodes = [];
    const declarations = path.get("declarations");
    let firstId;

    for (const declar of declarations) {
      firstId = declar.node.id;

      if (declar.node.init) {
        nodes.push(t().expressionStatement(t().assignmentExpression("=", declar.node.id, declar.node.init)));
      }

      for (const name of Object.keys(declar.getBindingIdentifiers())) {
        state.emit(t().identifier(name), name, declar.node.init !== null);
      }
    }

    if (path.parentPath.isFor({
      left: path.node
    })) {
      path.replaceWith(firstId);
    } else {
      path.replaceWithMultiple(nodes);
    }
  }

};

function _default(path, emit, kind = "var") {
  path.traverse(visitor, {
    kind,
    emit
  });
}