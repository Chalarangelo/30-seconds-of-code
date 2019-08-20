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

function _pluginSyntaxObjectRestSpread() {
  const data = _interopRequireDefault(require("@babel/plugin-syntax-object-rest-spread"));

  _pluginSyntaxObjectRestSpread = function () {
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ZERO_REFS = (() => {
  const node = _core().types.identifier("a");

  const property = _core().types.objectProperty(_core().types.identifier("key"), node);

  const pattern = _core().types.objectPattern([property]);

  return _core().types.isReferenced(node, property, pattern) ? 1 : 0;
})();

var _default = (0, _helperPluginUtils().declare)((api, opts) => {
  api.assertVersion(7);
  const {
    useBuiltIns = false,
    loose = false
  } = opts;

  if (typeof loose !== "boolean") {
    throw new Error(".loose must be a boolean, or undefined");
  }

  function getExtendsHelper(file) {
    return useBuiltIns ? _core().types.memberExpression(_core().types.identifier("Object"), _core().types.identifier("assign")) : file.addHelper("extends");
  }

  function hasRestElement(path) {
    let foundRestElement = false;
    visitRestElements(path, () => {
      foundRestElement = true;
      path.stop();
    });
    return foundRestElement;
  }

  function visitRestElements(path, visitor) {
    path.traverse({
      Expression(path) {
        const parentType = path.parent.type;

        if (parentType === "AssignmentPattern" && path.key === "right" || parentType === "ObjectProperty" && path.parent.computed && path.key === "key") {
          path.skip();
        }
      },

      RestElement: visitor
    });
  }

  function hasSpread(node) {
    for (const prop of node.properties) {
      if (_core().types.isSpreadElement(prop)) {
        return true;
      }
    }

    return false;
  }

  function extractNormalizedKeys(path) {
    const props = path.node.properties;
    const keys = [];
    let allLiteral = true;

    for (const prop of props) {
      if (_core().types.isIdentifier(prop.key) && !prop.computed) {
        keys.push(_core().types.stringLiteral(prop.key.name));
      } else if (_core().types.isTemplateLiteral(prop.key)) {
        keys.push(_core().types.cloneNode(prop.key));
      } else if (_core().types.isLiteral(prop.key)) {
        keys.push(_core().types.stringLiteral(String(prop.key.value)));
      } else {
        keys.push(_core().types.cloneNode(prop.key));
        allLiteral = false;
      }
    }

    return {
      keys,
      allLiteral
    };
  }

  function replaceImpureComputedKeys(path) {
    const impureComputedPropertyDeclarators = [];

    for (const propPath of path.get("properties")) {
      const key = propPath.get("key");

      if (propPath.node.computed && !key.isPure()) {
        const name = path.scope.generateUidBasedOnNode(key.node);

        const declarator = _core().types.variableDeclarator(_core().types.identifier(name), key.node);

        impureComputedPropertyDeclarators.push(declarator);
        key.replaceWith(_core().types.identifier(name));
      }
    }

    return impureComputedPropertyDeclarators;
  }

  function removeUnusedExcludedKeys(path) {
    const bindings = path.getOuterBindingIdentifierPaths();
    Object.keys(bindings).forEach(bindingName => {
      const bindingParentPath = bindings[bindingName].parentPath;

      if (path.scope.getBinding(bindingName).references > ZERO_REFS || !bindingParentPath.isObjectProperty()) {
        return;
      }

      bindingParentPath.remove();
    });
  }

  function createObjectSpread(path, file, objRef) {
    const props = path.get("properties");
    const last = props[props.length - 1];

    _core().types.assertRestElement(last.node);

    const restElement = _core().types.cloneNode(last.node);

    last.remove();
    const impureComputedPropertyDeclarators = replaceImpureComputedKeys(path);
    const {
      keys,
      allLiteral
    } = extractNormalizedKeys(path);

    if (keys.length === 0) {
      return [impureComputedPropertyDeclarators, restElement.argument, _core().types.callExpression(getExtendsHelper(file), [_core().types.objectExpression([]), _core().types.cloneNode(objRef)])];
    }

    let keyExpression;

    if (!allLiteral) {
      keyExpression = _core().types.callExpression(_core().types.memberExpression(_core().types.arrayExpression(keys), _core().types.identifier("map")), [file.addHelper("toPropertyKey")]);
    } else {
      keyExpression = _core().types.arrayExpression(keys);
    }

    return [impureComputedPropertyDeclarators, restElement.argument, _core().types.callExpression(file.addHelper(`objectWithoutProperties${loose ? "Loose" : ""}`), [_core().types.cloneNode(objRef), keyExpression])];
  }

  function replaceRestElement(parentPath, paramPath, i, numParams) {
    if (paramPath.isAssignmentPattern()) {
      replaceRestElement(parentPath, paramPath.get("left"), i, numParams);
      return;
    }

    if (paramPath.isArrayPattern() && hasRestElement(paramPath)) {
      const elements = paramPath.get("elements");

      for (let i = 0; i < elements.length; i++) {
        replaceRestElement(parentPath, elements[i], i, elements.length);
      }
    }

    if (paramPath.isObjectPattern() && hasRestElement(paramPath)) {
      const uid = parentPath.scope.generateUidIdentifier("ref");

      const declar = _core().types.variableDeclaration("let", [_core().types.variableDeclarator(paramPath.node, uid)]);

      parentPath.ensureBlock();
      parentPath.get("body").unshiftContainer("body", declar);
      paramPath.replaceWith(_core().types.cloneNode(uid));
    }
  }

  return {
    name: "proposal-object-rest-spread",
    inherits: _pluginSyntaxObjectRestSpread().default,
    visitor: {
      Function(path) {
        const params = path.get("params");

        for (let i = params.length - 1; i >= 0; i--) {
          replaceRestElement(params[i].parentPath, params[i], i, params.length);
        }
      },

      VariableDeclarator(path, file) {
        if (!path.get("id").isObjectPattern()) {
          return;
        }

        let insertionPath = path;
        const originalPath = path;
        visitRestElements(path.get("id"), path => {
          if (!path.parentPath.isObjectPattern()) {
            return;
          }

          if (originalPath.node.id.properties.length > 1 && !_core().types.isIdentifier(originalPath.node.init)) {
            const initRef = path.scope.generateUidIdentifierBasedOnNode(originalPath.node.init, "ref");
            originalPath.insertBefore(_core().types.variableDeclarator(initRef, originalPath.node.init));
            originalPath.replaceWith(_core().types.variableDeclarator(originalPath.node.id, _core().types.cloneNode(initRef)));
            return;
          }

          let ref = originalPath.node.init;
          const refPropertyPath = [];
          let kind;
          path.findParent(path => {
            if (path.isObjectProperty()) {
              refPropertyPath.unshift(path.node.key.name);
            } else if (path.isVariableDeclarator()) {
              kind = path.parentPath.node.kind;
              return true;
            }
          });

          if (refPropertyPath.length) {
            refPropertyPath.forEach(prop => {
              ref = _core().types.memberExpression(ref, _core().types.identifier(prop));
            });
          }

          const objectPatternPath = path.findParent(path => path.isObjectPattern());
          const [impureComputedPropertyDeclarators, argument, callExpression] = createObjectSpread(objectPatternPath, file, ref);

          if (loose) {
            removeUnusedExcludedKeys(objectPatternPath);
          }

          _core().types.assertIdentifier(argument);

          insertionPath.insertBefore(impureComputedPropertyDeclarators);
          insertionPath.insertAfter(_core().types.variableDeclarator(argument, callExpression));
          insertionPath = insertionPath.getSibling(insertionPath.key + 1);
          path.scope.registerBinding(kind, insertionPath);

          if (objectPatternPath.node.properties.length === 0) {
            objectPatternPath.findParent(path => path.isObjectProperty() || path.isVariableDeclarator()).remove();
          }
        });
      },

      ExportNamedDeclaration(path) {
        const declaration = path.get("declaration");
        if (!declaration.isVariableDeclaration()) return;
        const hasRest = declaration.get("declarations").some(path => hasRestElement(path.get("id")));
        if (!hasRest) return;
        const specifiers = [];

        for (const name of Object.keys(path.getOuterBindingIdentifiers(path))) {
          specifiers.push(_core().types.exportSpecifier(_core().types.identifier(name), _core().types.identifier(name)));
        }

        path.replaceWith(declaration.node);
        path.insertAfter(_core().types.exportNamedDeclaration(null, specifiers));
      },

      CatchClause(path) {
        const paramPath = path.get("param");
        replaceRestElement(paramPath.parentPath, paramPath);
      },

      AssignmentExpression(path, file) {
        const leftPath = path.get("left");

        if (leftPath.isObjectPattern() && hasRestElement(leftPath)) {
          const nodes = [];
          const refName = path.scope.generateUidBasedOnNode(path.node.right, "ref");
          nodes.push(_core().types.variableDeclaration("var", [_core().types.variableDeclarator(_core().types.identifier(refName), path.node.right)]));
          const [impureComputedPropertyDeclarators, argument, callExpression] = createObjectSpread(leftPath, file, _core().types.identifier(refName));

          if (impureComputedPropertyDeclarators.length > 0) {
            nodes.push(_core().types.variableDeclaration("var", impureComputedPropertyDeclarators));
          }

          const nodeWithoutSpread = _core().types.cloneNode(path.node);

          nodeWithoutSpread.right = _core().types.identifier(refName);
          nodes.push(_core().types.expressionStatement(nodeWithoutSpread));
          nodes.push(_core().types.toStatement(_core().types.assignmentExpression("=", argument, callExpression)));
          nodes.push(_core().types.expressionStatement(_core().types.identifier(refName)));
          path.replaceWithMultiple(nodes);
        }
      },

      ForXStatement(path) {
        const {
          node,
          scope
        } = path;
        const leftPath = path.get("left");
        const left = node.left;

        if (_core().types.isObjectPattern(left) && hasRestElement(leftPath)) {
          const temp = scope.generateUidIdentifier("ref");
          node.left = _core().types.variableDeclaration("var", [_core().types.variableDeclarator(temp)]);
          path.ensureBlock();

          if (node.body.body.length === 0 && path.isCompletionRecord()) {
            node.body.body.unshift(_core().types.expressionStatement(scope.buildUndefinedNode()));
          }

          node.body.body.unshift(_core().types.expressionStatement(_core().types.assignmentExpression("=", left, _core().types.cloneNode(temp))));
          return;
        }

        if (!_core().types.isVariableDeclaration(left)) return;
        const pattern = left.declarations[0].id;
        if (!_core().types.isObjectPattern(pattern)) return;
        const key = scope.generateUidIdentifier("ref");
        node.left = _core().types.variableDeclaration(left.kind, [_core().types.variableDeclarator(key, null)]);
        path.ensureBlock();
        node.body.body.unshift(_core().types.variableDeclaration(node.left.kind, [_core().types.variableDeclarator(pattern, _core().types.cloneNode(key))]));
      },

      ObjectExpression(path, file) {
        if (!hasSpread(path.node)) return;
        const args = [];
        let props = [];

        function push() {
          args.push(_core().types.objectExpression(props));
          props = [];
        }

        for (const prop of path.node.properties) {
          if (_core().types.isSpreadElement(prop)) {
            push();
            args.push(prop.argument);
          } else {
            props.push(prop);
          }
        }

        if (props.length) {
          push();
        }

        let helper;

        if (loose) {
          helper = getExtendsHelper(file);
        } else {
          try {
            helper = file.addHelper("objectSpread2");
          } catch (_unused) {
            this.file.declarations["objectSpread2"] = null;
            helper = file.addHelper("objectSpread");
          }
        }

        path.replaceWith(_core().types.callExpression(helper, args));
      }

    }
  };
});

exports.default = _default;