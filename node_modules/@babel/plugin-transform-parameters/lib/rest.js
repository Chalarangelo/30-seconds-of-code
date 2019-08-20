"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = convertFunctionRest;

function _core() {
  const data = require("@babel/core");

  _core = function () {
    return data;
  };

  return data;
}

const buildRest = (0, _core().template)(`
  for (var LEN = ARGUMENTS.length,
           ARRAY = new Array(ARRAY_LEN),
           KEY = START;
       KEY < LEN;
       KEY++) {
    ARRAY[ARRAY_KEY] = ARGUMENTS[KEY];
  }
`);
const restIndex = (0, _core().template)(`
  (INDEX < OFFSET || ARGUMENTS.length <= INDEX) ? undefined : ARGUMENTS[INDEX]
`);
const restIndexImpure = (0, _core().template)(`
  REF = INDEX, (REF < OFFSET || ARGUMENTS.length <= REF) ? undefined : ARGUMENTS[REF]
`);
const restLength = (0, _core().template)(`
  ARGUMENTS.length <= OFFSET ? 0 : ARGUMENTS.length - OFFSET
`);

function referencesRest(path, state) {
  if (path.node.name === state.name) {
    return path.scope.bindingIdentifierEquals(state.name, state.outerBinding);
  }

  return false;
}

const memberExpressionOptimisationVisitor = {
  Scope(path, state) {
    if (!path.scope.bindingIdentifierEquals(state.name, state.outerBinding)) {
      path.skip();
    }
  },

  Flow(path) {
    if (path.isTypeCastExpression()) return;
    path.skip();
  },

  Function(path, state) {
    const oldNoOptimise = state.noOptimise;
    state.noOptimise = true;
    path.traverse(memberExpressionOptimisationVisitor, state);
    state.noOptimise = oldNoOptimise;
    path.skip();
  },

  ReferencedIdentifier(path, state) {
    const {
      node
    } = path;

    if (node.name === "arguments") {
      state.deopted = true;
    }

    if (!referencesRest(path, state)) return;

    if (state.noOptimise) {
      state.deopted = true;
    } else {
      const {
        parentPath
      } = path;

      if (parentPath.listKey === "params" && parentPath.key < state.offset) {
        return;
      }

      if (parentPath.isMemberExpression({
        object: node
      })) {
        const grandparentPath = parentPath.parentPath;
        const argsOptEligible = !state.deopted && !(grandparentPath.isAssignmentExpression() && parentPath.node === grandparentPath.node.left || grandparentPath.isLVal() || grandparentPath.isForXStatement() || grandparentPath.isUpdateExpression() || grandparentPath.isUnaryExpression({
          operator: "delete"
        }) || (grandparentPath.isCallExpression() || grandparentPath.isNewExpression()) && parentPath.node === grandparentPath.node.callee);

        if (argsOptEligible) {
          if (parentPath.node.computed) {
            if (parentPath.get("property").isBaseType("number")) {
              state.candidates.push({
                cause: "indexGetter",
                path
              });
              return;
            }
          } else if (parentPath.node.property.name === "length") {
            state.candidates.push({
              cause: "lengthGetter",
              path
            });
            return;
          }
        }
      }

      if (state.offset === 0 && parentPath.isSpreadElement()) {
        const call = parentPath.parentPath;

        if (call.isCallExpression() && call.node.arguments.length === 1) {
          state.candidates.push({
            cause: "argSpread",
            path
          });
          return;
        }
      }

      state.references.push(path);
    }
  },

  BindingIdentifier(path, state) {
    if (referencesRest(path, state)) {
      state.deopted = true;
    }
  }

};

function hasRest(node) {
  const length = node.params.length;
  return length > 0 && _core().types.isRestElement(node.params[length - 1]);
}

function optimiseIndexGetter(path, argsId, offset) {
  const offsetLiteral = _core().types.numericLiteral(offset);

  let index;

  if (_core().types.isNumericLiteral(path.parent.property)) {
    index = _core().types.numericLiteral(path.parent.property.value + offset);
  } else if (offset === 0) {
    index = path.parent.property;
  } else {
    index = _core().types.binaryExpression("+", path.parent.property, _core().types.cloneNode(offsetLiteral));
  }

  const {
    scope
  } = path;

  if (!scope.isPure(index)) {
    const temp = scope.generateUidIdentifierBasedOnNode(index);
    scope.push({
      id: temp,
      kind: "var"
    });
    path.parentPath.replaceWith(restIndexImpure({
      ARGUMENTS: argsId,
      OFFSET: offsetLiteral,
      INDEX: index,
      REF: _core().types.cloneNode(temp)
    }));
  } else {
    const parentPath = path.parentPath;
    parentPath.replaceWith(restIndex({
      ARGUMENTS: argsId,
      OFFSET: offsetLiteral,
      INDEX: index
    }));
    const offsetTestPath = parentPath.get("test").get("left");
    const valRes = offsetTestPath.evaluate();

    if (valRes.confident) {
      if (valRes.value === true) {
        parentPath.replaceWith(parentPath.scope.buildUndefinedNode());
      } else {
        parentPath.get("test").replaceWith(parentPath.get("test").get("right"));
      }
    }
  }
}

function optimiseLengthGetter(path, argsId, offset) {
  if (offset) {
    path.parentPath.replaceWith(restLength({
      ARGUMENTS: argsId,
      OFFSET: _core().types.numericLiteral(offset)
    }));
  } else {
    path.replaceWith(argsId);
  }
}

function convertFunctionRest(path) {
  const {
    node,
    scope
  } = path;
  if (!hasRest(node)) return false;
  let rest = node.params.pop().argument;

  const argsId = _core().types.identifier("arguments");

  if (_core().types.isPattern(rest)) {
    const pattern = rest;
    rest = scope.generateUidIdentifier("ref");

    const declar = _core().types.variableDeclaration("let", [_core().types.variableDeclarator(pattern, rest)]);

    node.body.body.unshift(declar);
  }

  const state = {
    references: [],
    offset: node.params.length,
    argumentsNode: argsId,
    outerBinding: scope.getBindingIdentifier(rest.name),
    candidates: [],
    name: rest.name,
    deopted: false
  };
  path.traverse(memberExpressionOptimisationVisitor, state);

  if (!state.deopted && !state.references.length) {
    for (const _ref of state.candidates) {
      const {
        path,
        cause
      } = _ref;

      const clonedArgsId = _core().types.cloneNode(argsId);

      switch (cause) {
        case "indexGetter":
          optimiseIndexGetter(path, clonedArgsId, state.offset);
          break;

        case "lengthGetter":
          optimiseLengthGetter(path, clonedArgsId, state.offset);
          break;

        default:
          path.replaceWith(clonedArgsId);
      }
    }

    return true;
  }

  state.references = state.references.concat(state.candidates.map(({
    path
  }) => path));

  const start = _core().types.numericLiteral(node.params.length);

  const key = scope.generateUidIdentifier("key");
  const len = scope.generateUidIdentifier("len");
  let arrKey, arrLen;

  if (node.params.length) {
    arrKey = _core().types.binaryExpression("-", _core().types.cloneNode(key), _core().types.cloneNode(start));
    arrLen = _core().types.conditionalExpression(_core().types.binaryExpression(">", _core().types.cloneNode(len), _core().types.cloneNode(start)), _core().types.binaryExpression("-", _core().types.cloneNode(len), _core().types.cloneNode(start)), _core().types.numericLiteral(0));
  } else {
    arrKey = _core().types.identifier(key.name);
    arrLen = _core().types.identifier(len.name);
  }

  const loop = buildRest({
    ARGUMENTS: argsId,
    ARRAY_KEY: arrKey,
    ARRAY_LEN: arrLen,
    START: start,
    ARRAY: rest,
    KEY: key,
    LEN: len
  });

  if (state.deopted) {
    node.body.body.unshift(loop);
  } else {
    let target = path.getEarliestCommonAncestorFrom(state.references).getStatementParent();
    target.findParent(path => {
      if (path.isLoop()) {
        target = path;
      } else {
        return path.isFunction();
      }
    });
    target.insertBefore(loop);
  }

  return true;
}