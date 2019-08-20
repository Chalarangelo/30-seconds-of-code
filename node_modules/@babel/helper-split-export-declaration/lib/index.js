"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = splitExportDeclaration;

function t() {
  const data = _interopRequireWildcard(require("@babel/types"));

  t = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function splitExportDeclaration(exportDeclaration) {
  if (!exportDeclaration.isExportDeclaration()) {
    throw new Error("Only export declarations can be splitted.");
  }

  const isDefault = exportDeclaration.isExportDefaultDeclaration();
  const declaration = exportDeclaration.get("declaration");
  const isClassDeclaration = declaration.isClassDeclaration();

  if (isDefault) {
    const standaloneDeclaration = declaration.isFunctionDeclaration() || isClassDeclaration;
    const scope = declaration.isScope() ? declaration.scope.parent : declaration.scope;
    let id = declaration.node.id;
    let needBindingRegistration = false;

    if (!id) {
      needBindingRegistration = true;
      id = scope.generateUidIdentifier("default");

      if (standaloneDeclaration || declaration.isFunctionExpression() || declaration.isClassExpression()) {
        declaration.node.id = t().cloneNode(id);
      }
    }

    const updatedDeclaration = standaloneDeclaration ? declaration : t().variableDeclaration("var", [t().variableDeclarator(t().cloneNode(id), declaration.node)]);
    const updatedExportDeclaration = t().exportNamedDeclaration(null, [t().exportSpecifier(t().cloneNode(id), t().identifier("default"))]);
    exportDeclaration.insertAfter(updatedExportDeclaration);
    exportDeclaration.replaceWith(updatedDeclaration);

    if (needBindingRegistration) {
      scope.registerDeclaration(exportDeclaration);
    }

    return exportDeclaration;
  }

  if (exportDeclaration.get("specifiers").length > 0) {
    throw new Error("It doesn't make sense to split exported specifiers.");
  }

  const bindingIdentifiers = declaration.getOuterBindingIdentifiers();
  const specifiers = Object.keys(bindingIdentifiers).map(name => {
    return t().exportSpecifier(t().identifier(name), t().identifier(name));
  });
  const aliasDeclar = t().exportNamedDeclaration(null, specifiers);
  exportDeclaration.insertAfter(aliasDeclar);
  exportDeclaration.replaceWith(declaration.node);
  return exportDeclaration;
}