"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _core() {
  const data = require("@babel/core");

  _core = function () {
    return data;
  };

  return data;
}

const buildForAwait = (0, _core().template)(`
  async function wrapper() {
    var ITERATOR_COMPLETION = true;
    var ITERATOR_HAD_ERROR_KEY = false;
    var ITERATOR_ERROR_KEY;
    try {
      for (
        var ITERATOR_KEY = GET_ITERATOR(OBJECT), STEP_KEY, STEP_VALUE;
        (
          STEP_KEY = await ITERATOR_KEY.next(),
          ITERATOR_COMPLETION = STEP_KEY.done,
          STEP_VALUE = await STEP_KEY.value,
          !ITERATOR_COMPLETION
        );
        ITERATOR_COMPLETION = true) {
      }
    } catch (err) {
      ITERATOR_HAD_ERROR_KEY = true;
      ITERATOR_ERROR_KEY = err;
    } finally {
      try {
        if (!ITERATOR_COMPLETION && ITERATOR_KEY.return != null) {
          await ITERATOR_KEY.return();
        }
      } finally {
        if (ITERATOR_HAD_ERROR_KEY) {
          throw ITERATOR_ERROR_KEY;
        }
      }
    }
  }
`);

function _default(path, {
  getAsyncIterator
}) {
  const {
    node,
    scope,
    parent
  } = path;
  const stepKey = scope.generateUidIdentifier("step");
  const stepValue = scope.generateUidIdentifier("value");
  const left = node.left;
  let declar;

  if (_core().types.isIdentifier(left) || _core().types.isPattern(left) || _core().types.isMemberExpression(left)) {
    declar = _core().types.expressionStatement(_core().types.assignmentExpression("=", left, stepValue));
  } else if (_core().types.isVariableDeclaration(left)) {
    declar = _core().types.variableDeclaration(left.kind, [_core().types.variableDeclarator(left.declarations[0].id, stepValue)]);
  }

  let template = buildForAwait({
    ITERATOR_HAD_ERROR_KEY: scope.generateUidIdentifier("didIteratorError"),
    ITERATOR_COMPLETION: scope.generateUidIdentifier("iteratorNormalCompletion"),
    ITERATOR_ERROR_KEY: scope.generateUidIdentifier("iteratorError"),
    ITERATOR_KEY: scope.generateUidIdentifier("iterator"),
    GET_ITERATOR: getAsyncIterator,
    OBJECT: node.right,
    STEP_VALUE: stepValue,
    STEP_KEY: stepKey
  });
  template = template.body.body;

  const isLabeledParent = _core().types.isLabeledStatement(parent);

  const tryBody = template[3].block.body;
  const loop = tryBody[0];

  if (isLabeledParent) {
    tryBody[0] = _core().types.labeledStatement(parent.label, loop);
  }

  return {
    replaceParent: isLabeledParent,
    node: template,
    declar,
    loop
  };
}