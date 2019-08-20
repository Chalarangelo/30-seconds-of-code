"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _helperGetFunctionArity() {
  const data = _interopRequireDefault(require("@babel/helper-get-function-arity"));

  _helperGetFunctionArity = function () {
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

function t() {
  const data = _interopRequireWildcard(require("@babel/types"));

  t = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildPropertyMethodAssignmentWrapper = (0, _template().default)(`
  (function (FUNCTION_KEY) {
    function FUNCTION_ID() {
      return FUNCTION_KEY.apply(this, arguments);
    }

    FUNCTION_ID.toString = function () {
      return FUNCTION_KEY.toString();
    }

    return FUNCTION_ID;
  })(FUNCTION)
`);
const buildGeneratorPropertyMethodAssignmentWrapper = (0, _template().default)(`
  (function (FUNCTION_KEY) {
    function* FUNCTION_ID() {
      return yield* FUNCTION_KEY.apply(this, arguments);
    }

    FUNCTION_ID.toString = function () {
      return FUNCTION_KEY.toString();
    };

    return FUNCTION_ID;
  })(FUNCTION)
`);
const visitor = {
  "ReferencedIdentifier|BindingIdentifier"(path, state) {
    if (path.node.name !== state.name) return;
    const localDeclar = path.scope.getBindingIdentifier(state.name);
    if (localDeclar !== state.outerDeclar) return;
    state.selfReference = true;
    path.stop();
  }

};

function getNameFromLiteralId(id) {
  if (t().isNullLiteral(id)) {
    return "null";
  }

  if (t().isRegExpLiteral(id)) {
    return `_${id.pattern}_${id.flags}`;
  }

  if (t().isTemplateLiteral(id)) {
    return id.quasis.map(quasi => quasi.value.raw).join("");
  }

  if (id.value !== undefined) {
    return id.value + "";
  }

  return "";
}

function wrap(state, method, id, scope) {
  if (state.selfReference) {
    if (scope.hasBinding(id.name) && !scope.hasGlobal(id.name)) {
      scope.rename(id.name);
    } else {
      if (!t().isFunction(method)) return;
      let build = buildPropertyMethodAssignmentWrapper;

      if (method.generator) {
        build = buildGeneratorPropertyMethodAssignmentWrapper;
      }

      const template = build({
        FUNCTION: method,
        FUNCTION_ID: id,
        FUNCTION_KEY: scope.generateUidIdentifier(id.name)
      }).expression;
      const params = template.callee.body.body[0].params;

      for (let i = 0, len = (0, _helperGetFunctionArity().default)(method); i < len; i++) {
        params.push(scope.generateUidIdentifier("x"));
      }

      return template;
    }
  }

  method.id = id;
  scope.getProgramParent().references[id.name] = true;
}

function visit(node, name, scope) {
  const state = {
    selfAssignment: false,
    selfReference: false,
    outerDeclar: scope.getBindingIdentifier(name),
    references: [],
    name: name
  };
  const binding = scope.getOwnBinding(name);

  if (binding) {
    if (binding.kind === "param") {
      state.selfReference = true;
    } else {}
  } else if (state.outerDeclar || scope.hasGlobal(name)) {
    scope.traverse(node, visitor, state);
  }

  return state;
}

function _default({
  node,
  parent,
  scope,
  id
}, localBinding = false) {
  if (node.id) return;

  if ((t().isObjectProperty(parent) || t().isObjectMethod(parent, {
    kind: "method"
  })) && (!parent.computed || t().isLiteral(parent.key))) {
    id = parent.key;
  } else if (t().isVariableDeclarator(parent)) {
    id = parent.id;

    if (t().isIdentifier(id) && !localBinding) {
      const binding = scope.parent.getBinding(id.name);

      if (binding && binding.constant && scope.getBinding(id.name) === binding) {
        node.id = t().cloneNode(id);
        node.id[t().NOT_LOCAL_BINDING] = true;
        return;
      }
    }
  } else if (t().isAssignmentExpression(parent)) {
    id = parent.left;
  } else if (!id) {
    return;
  }

  let name;

  if (id && t().isLiteral(id)) {
    name = getNameFromLiteralId(id);
  } else if (id && t().isIdentifier(id)) {
    name = id.name;
  }

  if (name === undefined) {
    return;
  }

  name = t().toBindingIdentifierName(name);
  id = t().identifier(name);
  id[t().NOT_LOCAL_BINDING] = true;
  const state = visit(node, name, scope);
  return wrap(state, node, id, scope) || node;
}