"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _helperHoistVariables() {
  const data = _interopRequireDefault(require("@babel/helper-hoist-variables"));

  _helperHoistVariables = function () {
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

const visitor = {
  enter(path, state) {
    if (path.isThisExpression()) {
      state.foundThis = true;
    }

    if (path.isReferencedIdentifier({
      name: "arguments"
    })) {
      state.foundArguments = true;
    }
  },

  Function(path) {
    path.skip();
  }

};

function _default(path, scope = path.scope) {
  const {
    node
  } = path;
  const container = t().functionExpression(null, [], node.body, node.generator, node.async);
  let callee = container;
  let args = [];
  (0, _helperHoistVariables().default)(path, id => scope.push({
    id
  }));
  const state = {
    foundThis: false,
    foundArguments: false
  };
  path.traverse(visitor, state);

  if (state.foundArguments || state.foundThis) {
    callee = t().memberExpression(container, t().identifier("apply"));
    args = [];

    if (state.foundThis) {
      args.push(t().thisExpression());
    }

    if (state.foundArguments) {
      if (!state.foundThis) args.push(t().nullLiteral());
      args.push(t().identifier("arguments"));
    }
  }

  let call = t().callExpression(callee, args);
  if (node.generator) call = t().yieldExpression(call, true);
  return t().returnStatement(call);
}