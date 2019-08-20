"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rewriteLiveReferences;

function _assert() {
  const data = _interopRequireDefault(require("assert"));

  _assert = function () {
    return data;
  };

  return data;
}

function t() {
  const data = _interopRequireWildcard(require("@babel/types"));

  t = function () {
    return data;
  };

  return data;
}

function _template() {
  const data = _interopRequireDefault(require("@babel/template"));

  _template = function () {
    return data;
  };

  return data;
}

function _helperSimpleAccess() {
  const data = _interopRequireDefault(require("@babel/helper-simple-access"));

  _helperSimpleAccess = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rewriteLiveReferences(programPath, metadata) {
  const imported = new Map();
  const exported = new Map();

  const requeueInParent = path => {
    programPath.requeue(path);
  };

  for (const [source, data] of metadata.source) {
    for (const [localName, importName] of data.imports) {
      imported.set(localName, [source, importName, null]);
    }

    for (const localName of data.importsNamespace) {
      imported.set(localName, [source, null, localName]);
    }
  }

  for (const [local, data] of metadata.local) {
    let exportMeta = exported.get(local);

    if (!exportMeta) {
      exportMeta = [];
      exported.set(local, exportMeta);
    }

    exportMeta.push(...data.names);
  }

  programPath.traverse(rewriteBindingInitVisitor, {
    metadata,
    requeueInParent,
    scope: programPath.scope,
    exported
  });
  (0, _helperSimpleAccess().default)(programPath, new Set([...Array.from(imported.keys()), ...Array.from(exported.keys())]));
  programPath.traverse(rewriteReferencesVisitor, {
    seen: new WeakSet(),
    metadata,
    requeueInParent,
    scope: programPath.scope,
    imported,
    exported,
    buildImportReference: ([source, importName, localName], identNode) => {
      const meta = metadata.source.get(source);

      if (localName) {
        if (meta.lazy) identNode = t().callExpression(identNode, []);
        return identNode;
      }

      let namespace = t().identifier(meta.name);
      if (meta.lazy) namespace = t().callExpression(namespace, []);
      return t().memberExpression(namespace, t().identifier(importName));
    }
  });
}

const rewriteBindingInitVisitor = {
  ClassProperty(path) {
    path.skip();
  },

  Function(path) {
    path.skip();
  },

  ClassDeclaration(path) {
    const {
      requeueInParent,
      exported,
      metadata
    } = this;
    const {
      id
    } = path.node;
    if (!id) throw new Error("Expected class to have a name");
    const localName = id.name;
    const exportNames = exported.get(localName) || [];

    if (exportNames.length > 0) {
      const statement = t().expressionStatement(buildBindingExportAssignmentExpression(metadata, exportNames, t().identifier(localName)));
      statement._blockHoist = path.node._blockHoist;
      requeueInParent(path.insertAfter(statement)[0]);
    }
  },

  VariableDeclaration(path) {
    const {
      requeueInParent,
      exported,
      metadata
    } = this;
    Object.keys(path.getOuterBindingIdentifiers()).forEach(localName => {
      const exportNames = exported.get(localName) || [];

      if (exportNames.length > 0) {
        const statement = t().expressionStatement(buildBindingExportAssignmentExpression(metadata, exportNames, t().identifier(localName)));
        statement._blockHoist = path.node._blockHoist;
        requeueInParent(path.insertAfter(statement)[0]);
      }
    });
  }

};

const buildBindingExportAssignmentExpression = (metadata, exportNames, localExpr) => {
  return (exportNames || []).reduce((expr, exportName) => {
    return t().assignmentExpression("=", t().memberExpression(t().identifier(metadata.exportName), t().identifier(exportName)), expr);
  }, localExpr);
};

const buildImportThrow = localName => {
  return _template().default.expression.ast`
    (function() {
      throw new Error('"' + '${localName}' + '" is read-only.');
    })()
  `;
};

const rewriteReferencesVisitor = {
  ReferencedIdentifier(path) {
    const {
      seen,
      buildImportReference,
      scope,
      imported,
      requeueInParent
    } = this;
    if (seen.has(path.node)) return;
    seen.add(path.node);
    const localName = path.node.name;
    const localBinding = path.scope.getBinding(localName);
    const rootBinding = scope.getBinding(localName);
    if (rootBinding !== localBinding) return;
    const importData = imported.get(localName);

    if (importData) {
      const ref = buildImportReference(importData, path.node);
      ref.loc = path.node.loc;

      if (path.parentPath.isCallExpression({
        callee: path.node
      }) && t().isMemberExpression(ref)) {
        path.replaceWith(t().sequenceExpression([t().numericLiteral(0), ref]));
      } else if (path.isJSXIdentifier() && t().isMemberExpression(ref)) {
        const {
          object,
          property
        } = ref;
        path.replaceWith(t().JSXMemberExpression(t().JSXIdentifier(object.name), t().JSXIdentifier(property.name)));
      } else {
        path.replaceWith(ref);
      }

      requeueInParent(path);
      path.skip();
    }
  },

  AssignmentExpression: {
    exit(path) {
      const {
        scope,
        seen,
        imported,
        exported,
        requeueInParent,
        buildImportReference
      } = this;
      if (seen.has(path.node)) return;
      seen.add(path.node);
      const left = path.get("left");

      if (left.isIdentifier()) {
        const localName = left.node.name;

        if (scope.getBinding(localName) !== path.scope.getBinding(localName)) {
          return;
        }

        const exportedNames = exported.get(localName) || [];
        const importData = imported.get(localName);

        if (exportedNames.length > 0 || importData) {
          (0, _assert().default)(path.node.operator === "=", "Path was not simplified");
          const assignment = path.node;

          if (importData) {
            assignment.left = buildImportReference(importData, assignment.left);
            assignment.right = t().sequenceExpression([assignment.right, buildImportThrow(localName)]);
          }

          path.replaceWith(buildBindingExportAssignmentExpression(this.metadata, exportedNames, assignment));
          requeueInParent(path);
        }
      } else if (left.isMemberExpression()) {} else {
        const ids = left.getOuterBindingIdentifiers();
        const id = Object.keys(ids).filter(localName => imported.has(localName)).pop();

        if (id) {
          path.node.right = t().sequenceExpression([path.node.right, buildImportThrow(id)]);
        }

        const items = [];
        Object.keys(ids).forEach(localName => {
          if (scope.getBinding(localName) !== path.scope.getBinding(localName)) {
            return;
          }

          const exportedNames = exported.get(localName) || [];

          if (exportedNames.length > 0) {
            items.push(buildBindingExportAssignmentExpression(this.metadata, exportedNames, t().identifier(localName)));
          }
        });

        if (items.length > 0) {
          let node = t().sequenceExpression(items);

          if (path.parentPath.isExpressionStatement()) {
            node = t().expressionStatement(node);
            node._blockHoist = path.parentPath.node._blockHoist;
          }

          const statement = path.insertAfter(node)[0];
          requeueInParent(statement);
        }
      }
    }

  }
};