"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectInitialization = injectInitialization;
exports.extractComputedKeys = extractComputedKeys;

function _core() {
  const data = require("@babel/core");

  _core = function () {
    return data;
  };

  return data;
}

function _helperReplaceSupers() {
  const data = require("@babel/helper-replace-supers");

  _helperReplaceSupers = function () {
    return data;
  };

  return data;
}

const findBareSupers = _core().traverse.visitors.merge([{
  Super(path) {
    const {
      node,
      parentPath
    } = path;

    if (parentPath.isCallExpression({
      callee: node
    })) {
      this.push(parentPath);
    }
  }

}, _helperReplaceSupers().environmentVisitor]);

const referenceVisitor = {
  "TSTypeAnnotation|TypeAnnotation"(path) {
    path.skip();
  },

  ReferencedIdentifier(path) {
    if (this.scope.hasOwnBinding(path.node.name)) {
      this.scope.rename(path.node.name);
      path.skip();
    }
  }

};

const classFieldDefinitionEvaluationTDZVisitor = _core().traverse.visitors.merge([{
  ReferencedIdentifier(path) {
    if (this.classBinding && this.classBinding === path.scope.getBinding(path.node.name)) {
      const classNameTDZError = this.file.addHelper("classNameTDZError");

      const throwNode = _core().types.callExpression(classNameTDZError, [_core().types.stringLiteral(path.node.name)]);

      path.replaceWith(_core().types.sequenceExpression([throwNode, path.node]));
      path.skip();
    }
  }

}, _helperReplaceSupers().environmentVisitor]);

function injectInitialization(path, constructor, nodes, renamer) {
  if (!nodes.length) return;
  const isDerived = !!path.node.superClass;

  if (!constructor) {
    const newConstructor = _core().types.classMethod("constructor", _core().types.identifier("constructor"), [], _core().types.blockStatement([]));

    if (isDerived) {
      newConstructor.params = [_core().types.restElement(_core().types.identifier("args"))];
      newConstructor.body.body.push(_core().template.statement.ast`super(...args)`);
    }

    [constructor] = path.get("body").unshiftContainer("body", newConstructor);
  }

  if (renamer) {
    renamer(referenceVisitor, {
      scope: constructor.scope
    });
  }

  if (isDerived) {
    const bareSupers = [];
    constructor.traverse(findBareSupers, bareSupers);

    for (const bareSuper of bareSupers) {
      bareSuper.insertAfter(nodes);
    }
  } else {
    constructor.get("body").unshiftContainer("body", nodes);
  }
}

function extractComputedKeys(ref, path, computedPaths, file) {
  const declarations = [];

  for (const computedPath of computedPaths) {
    computedPath.traverse(classFieldDefinitionEvaluationTDZVisitor, {
      classBinding: path.node.id && path.scope.getBinding(path.node.id.name),
      file
    });
    const computedNode = computedPath.node;

    if (!computedPath.get("key").isConstantExpression()) {
      const ident = path.scope.generateUidIdentifierBasedOnNode(computedNode.key);
      path.scope.push({
        id: ident,
        kind: "let"
      });
      declarations.push(_core().types.expressionStatement(_core().types.assignmentExpression("=", _core().types.cloneNode(ident), computedNode.key)));
      computedNode.key = _core().types.cloneNode(ident);
    }
  }

  return declarations;
}