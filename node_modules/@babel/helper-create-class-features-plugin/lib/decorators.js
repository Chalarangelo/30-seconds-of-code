"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasOwnDecorators = hasOwnDecorators;
exports.hasDecorators = hasDecorators;
exports.buildDecoratedClass = buildDecoratedClass;

function _core() {
  const data = require("@babel/core");

  _core = function () {
    return data;
  };

  return data;
}

function _helperReplaceSupers() {
  const data = _interopRequireDefault(require("@babel/helper-replace-supers"));

  _helperReplaceSupers = function () {
    return data;
  };

  return data;
}

function _helperFunctionName() {
  const data = _interopRequireDefault(require("@babel/helper-function-name"));

  _helperFunctionName = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasOwnDecorators(node) {
  return !!(node.decorators && node.decorators.length);
}

function hasDecorators(node) {
  return hasOwnDecorators(node) || node.body.body.some(hasOwnDecorators);
}

function prop(key, value) {
  if (!value) return null;
  return _core().types.objectProperty(_core().types.identifier(key), value);
}

function method(key, body) {
  return _core().types.objectMethod("method", _core().types.identifier(key), [], _core().types.blockStatement(body));
}

function takeDecorators(node) {
  let result;

  if (node.decorators && node.decorators.length > 0) {
    result = _core().types.arrayExpression(node.decorators.map(decorator => decorator.expression));
  }

  node.decorators = undefined;
  return result;
}

function getKey(node) {
  if (node.computed) {
    return node.key;
  } else if (_core().types.isIdentifier(node.key)) {
    return _core().types.stringLiteral(node.key.name);
  } else {
    return _core().types.stringLiteral(String(node.key.value));
  }
}

function extractElementDescriptor(classRef, superRef, path) {
  const {
    node,
    scope
  } = path;
  const isMethod = path.isClassMethod();

  if (path.isPrivate()) {
    throw path.buildCodeFrameError(`Private ${isMethod ? "methods" : "fields"} in decorated classes are not supported yet.`);
  }

  new (_helperReplaceSupers().default)({
    methodPath: path,
    methodNode: node,
    objectRef: classRef,
    isStatic: node.static,
    superRef,
    scope,
    file: this
  }, true).replace();
  const properties = [prop("kind", _core().types.stringLiteral(isMethod ? node.kind : "field")), prop("decorators", takeDecorators(node)), prop("static", node.static && _core().types.booleanLiteral(true)), prop("key", getKey(node))].filter(Boolean);

  if (isMethod) {
    const id = node.computed ? null : node.key;

    _core().types.toExpression(node);

    properties.push(prop("value", (0, _helperFunctionName().default)({
      node,
      id,
      scope
    }) || node));
  } else if (node.value) {
    properties.push(method("value", _core().template.statements.ast`return ${node.value}`));
  } else {
    properties.push(prop("value", scope.buildUndefinedNode()));
  }

  path.remove();
  return _core().types.objectExpression(properties);
}

function addDecorateHelper(file) {
  try {
    return file.addHelper("decorate");
  } catch (err) {
    if (err.code === "BABEL_HELPER_UNKNOWN") {
      err.message += "\n  '@babel/plugin-transform-decorators' in non-legacy mode" + " requires '@babel/core' version ^7.0.2 and you appear to be using" + " an older version.";
    }

    throw err;
  }
}

function buildDecoratedClass(ref, path, elements, file) {
  const {
    node,
    scope
  } = path;
  const initializeId = scope.generateUidIdentifier("initialize");
  const isDeclaration = node.id && path.isDeclaration();
  const isStrict = path.isInStrictMode();
  const {
    superClass
  } = node;
  node.type = "ClassDeclaration";
  if (!node.id) node.id = _core().types.cloneNode(ref);
  let superId;

  if (superClass) {
    superId = scope.generateUidIdentifierBasedOnNode(node.superClass, "super");
    node.superClass = superId;
  }

  const classDecorators = takeDecorators(node);

  const definitions = _core().types.arrayExpression(elements.map(extractElementDescriptor.bind(file, node.id, superId)));

  let replacement = _core().template.expression.ast`
    ${addDecorateHelper(file)}(
      ${classDecorators || _core().types.nullLiteral()},
      function (${initializeId}, ${superClass ? superId : null}) {
        ${node}
        return { F: ${_core().types.cloneNode(node.id)}, d: ${definitions} };
      },
      ${superClass}
    )
  `;
  let classPathDesc = "arguments.1.body.body.0";

  if (!isStrict) {
    replacement.arguments[1].body.directives.push(_core().types.directive(_core().types.directiveLiteral("use strict")));
  }

  if (isDeclaration) {
    replacement = _core().template.ast`let ${ref} = ${replacement}`;
    classPathDesc = "declarations.0.init." + classPathDesc;
  }

  return {
    instanceNodes: [_core().template.statement.ast`${initializeId}(this)`],

    wrapClass(path) {
      path.replaceWith(replacement);
      return path.get(classPathDesc);
    }

  };
}