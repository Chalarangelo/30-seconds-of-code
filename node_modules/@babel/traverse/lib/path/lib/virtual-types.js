"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForAwaitStatement = exports.NumericLiteralTypeAnnotation = exports.ExistentialTypeParam = exports.SpreadProperty = exports.RestProperty = exports.Flow = exports.Pure = exports.Generated = exports.User = exports.Var = exports.BlockScoped = exports.Referenced = exports.Scope = exports.Expression = exports.Statement = exports.BindingIdentifier = exports.ReferencedMemberExpression = exports.ReferencedIdentifier = void 0;

function t() {
  const data = _interopRequireWildcard(require("@babel/types"));

  t = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const ReferencedIdentifier = {
  types: ["Identifier", "JSXIdentifier"],

  checkPath(path, opts) {
    const {
      node,
      parent
    } = path;

    if (!t().isIdentifier(node, opts) && !t().isJSXMemberExpression(parent, opts)) {
      if (t().isJSXIdentifier(node, opts)) {
        if (t().react.isCompatTag(node.name)) return false;
      } else {
        return false;
      }
    }

    return t().isReferenced(node, parent, path.parentPath.parent);
  }

};
exports.ReferencedIdentifier = ReferencedIdentifier;
const ReferencedMemberExpression = {
  types: ["MemberExpression"],

  checkPath({
    node,
    parent
  }) {
    return t().isMemberExpression(node) && t().isReferenced(node, parent);
  }

};
exports.ReferencedMemberExpression = ReferencedMemberExpression;
const BindingIdentifier = {
  types: ["Identifier"],

  checkPath(path) {
    const {
      node,
      parent
    } = path;
    const grandparent = path.parentPath.parent;
    return t().isIdentifier(node) && t().isBinding(node, parent, grandparent);
  }

};
exports.BindingIdentifier = BindingIdentifier;
const Statement = {
  types: ["Statement"],

  checkPath({
    node,
    parent
  }) {
    if (t().isStatement(node)) {
      if (t().isVariableDeclaration(node)) {
        if (t().isForXStatement(parent, {
          left: node
        })) return false;
        if (t().isForStatement(parent, {
          init: node
        })) return false;
      }

      return true;
    } else {
      return false;
    }
  }

};
exports.Statement = Statement;
const Expression = {
  types: ["Expression"],

  checkPath(path) {
    if (path.isIdentifier()) {
      return path.isReferencedIdentifier();
    } else {
      return t().isExpression(path.node);
    }
  }

};
exports.Expression = Expression;
const Scope = {
  types: ["Scopable"],

  checkPath(path) {
    return t().isScope(path.node, path.parent);
  }

};
exports.Scope = Scope;
const Referenced = {
  checkPath(path) {
    return t().isReferenced(path.node, path.parent);
  }

};
exports.Referenced = Referenced;
const BlockScoped = {
  checkPath(path) {
    return t().isBlockScoped(path.node);
  }

};
exports.BlockScoped = BlockScoped;
const Var = {
  types: ["VariableDeclaration"],

  checkPath(path) {
    return t().isVar(path.node);
  }

};
exports.Var = Var;
const User = {
  checkPath(path) {
    return path.node && !!path.node.loc;
  }

};
exports.User = User;
const Generated = {
  checkPath(path) {
    return !path.isUser();
  }

};
exports.Generated = Generated;
const Pure = {
  checkPath(path, opts) {
    return path.scope.isPure(path.node, opts);
  }

};
exports.Pure = Pure;
const Flow = {
  types: ["Flow", "ImportDeclaration", "ExportDeclaration", "ImportSpecifier"],

  checkPath({
    node
  }) {
    if (t().isFlow(node)) {
      return true;
    } else if (t().isImportDeclaration(node)) {
      return node.importKind === "type" || node.importKind === "typeof";
    } else if (t().isExportDeclaration(node)) {
      return node.exportKind === "type";
    } else if (t().isImportSpecifier(node)) {
      return node.importKind === "type" || node.importKind === "typeof";
    } else {
      return false;
    }
  }

};
exports.Flow = Flow;
const RestProperty = {
  types: ["RestElement"],

  checkPath(path) {
    return path.parentPath && path.parentPath.isObjectPattern();
  }

};
exports.RestProperty = RestProperty;
const SpreadProperty = {
  types: ["RestElement"],

  checkPath(path) {
    return path.parentPath && path.parentPath.isObjectExpression();
  }

};
exports.SpreadProperty = SpreadProperty;
const ExistentialTypeParam = {
  types: ["ExistsTypeAnnotation"]
};
exports.ExistentialTypeParam = ExistentialTypeParam;
const NumericLiteralTypeAnnotation = {
  types: ["NumberLiteralTypeAnnotation"]
};
exports.NumericLiteralTypeAnnotation = NumericLiteralTypeAnnotation;
const ForAwaitStatement = {
  types: ["ForOfStatement"],

  checkPath({
    node
  }) {
    return node.await === true;
  }

};
exports.ForAwaitStatement = ForAwaitStatement;