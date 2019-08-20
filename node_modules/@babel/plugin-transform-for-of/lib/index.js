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

function _core() {
  const data = require("@babel/core");

  _core = function () {
    return data;
  };

  return data;
}

var _default = (0, _helperPluginUtils().declare)((api, options) => {
  api.assertVersion(7);
  const {
    loose,
    assumeArray
  } = options;

  if (loose === true && assumeArray === true) {
    throw new Error(`The loose and assumeArray options cannot be used together in @babel/plugin-transform-for-of`);
  }

  if (assumeArray) {
    return {
      name: "transform-for-of",
      visitor: {
        ForOfStatement(path) {
          const {
            scope
          } = path;
          const {
            left,
            right,
            body
          } = path.node;
          const i = scope.generateUidIdentifier("i");
          let array = scope.maybeGenerateMemoised(right, true);
          const inits = [_core().types.variableDeclarator(i, _core().types.numericLiteral(0))];

          if (array) {
            inits.push(_core().types.variableDeclarator(array, right));
          } else {
            array = right;
          }

          const item = _core().types.memberExpression(_core().types.cloneNode(array), _core().types.cloneNode(i), true);

          let assignment;

          if (_core().types.isVariableDeclaration(left)) {
            assignment = left;
            assignment.declarations[0].init = item;
          } else {
            assignment = _core().types.expressionStatement(_core().types.assignmentExpression("=", left, item));
          }

          const block = _core().types.toBlock(body);

          block.body.unshift(assignment);
          path.replaceWith(_core().types.forStatement(_core().types.variableDeclaration("let", inits), _core().types.binaryExpression("<", _core().types.cloneNode(i), _core().types.memberExpression(_core().types.cloneNode(array), _core().types.identifier("length"))), _core().types.updateExpression("++", _core().types.cloneNode(i)), block));
        }

      }
    };
  }

  const pushComputedProps = loose ? pushComputedPropsLoose : pushComputedPropsSpec;
  const buildForOfArray = (0, _core().template)(`
    for (var KEY = 0, NAME = ARR; KEY < NAME.length; KEY++) BODY;
  `);
  const buildForOfLoose = (0, _core().template)(`
    for (var LOOP_OBJECT = OBJECT,
             IS_ARRAY = Array.isArray(LOOP_OBJECT),
             INDEX = 0,
             LOOP_OBJECT = IS_ARRAY ? LOOP_OBJECT : LOOP_OBJECT[Symbol.iterator]();;) {
      INTERMEDIATE;
      if (IS_ARRAY) {
        if (INDEX >= LOOP_OBJECT.length) break;
        ID = LOOP_OBJECT[INDEX++];
      } else {
        INDEX = LOOP_OBJECT.next();
        if (INDEX.done) break;
        ID = INDEX.value;
      }
    }
  `);
  const buildForOf = (0, _core().template)(`
    var ITERATOR_COMPLETION = true;
    var ITERATOR_HAD_ERROR_KEY = false;
    var ITERATOR_ERROR_KEY = undefined;
    try {
      for (
        var ITERATOR_KEY = OBJECT[Symbol.iterator](), STEP_KEY;
        !(ITERATOR_COMPLETION = (STEP_KEY = ITERATOR_KEY.next()).done);
        ITERATOR_COMPLETION = true
      ) {}
    } catch (err) {
      ITERATOR_HAD_ERROR_KEY = true;
      ITERATOR_ERROR_KEY = err;
    } finally {
      try {
        if (!ITERATOR_COMPLETION && ITERATOR_KEY.return != null) {
          ITERATOR_KEY.return();
        }
      } finally {
        if (ITERATOR_HAD_ERROR_KEY) {
          throw ITERATOR_ERROR_KEY;
        }
      }
    }
  `);

  function _ForOfStatementArray(path) {
    const {
      node,
      scope
    } = path;
    const right = scope.generateUidIdentifierBasedOnNode(node.right, "arr");
    const iterationKey = scope.generateUidIdentifier("i");
    let loop = buildForOfArray({
      BODY: node.body,
      KEY: iterationKey,
      NAME: right,
      ARR: node.right
    });

    _core().types.inherits(loop, node);

    _core().types.ensureBlock(loop);

    const iterationValue = _core().types.memberExpression(_core().types.cloneNode(right), _core().types.cloneNode(iterationKey), true);

    const left = node.left;

    if (_core().types.isVariableDeclaration(left)) {
      left.declarations[0].init = iterationValue;
      loop.body.body.unshift(left);
    } else {
      loop.body.body.unshift(_core().types.expressionStatement(_core().types.assignmentExpression("=", left, iterationValue)));
    }

    if (path.parentPath.isLabeledStatement()) {
      loop = _core().types.labeledStatement(path.parentPath.node.label, loop);
    }

    return [loop];
  }

  function replaceWithArray(path) {
    if (path.parentPath.isLabeledStatement()) {
      path.parentPath.replaceWithMultiple(_ForOfStatementArray(path));
    } else {
      path.replaceWithMultiple(_ForOfStatementArray(path));
    }
  }

  return {
    name: "transform-for-of",
    visitor: {
      ForOfStatement(path, state) {
        const right = path.get("right");

        if (right.isArrayExpression() || right.isGenericType("Array") || _core().types.isArrayTypeAnnotation(right.getTypeAnnotation())) {
          replaceWithArray(path);
          return;
        }

        const {
          node
        } = path;
        const build = pushComputedProps(path, state);
        const declar = build.declar;
        const loop = build.loop;
        const block = loop.body;
        path.ensureBlock();

        if (declar) {
          block.body.push(declar);
        }

        block.body = block.body.concat(node.body.body);

        _core().types.inherits(loop, node);

        _core().types.inherits(loop.body, node.body);

        if (build.replaceParent) {
          path.parentPath.replaceWithMultiple(build.node);
          path.remove();
        } else {
          path.replaceWithMultiple(build.node);
        }
      }

    }
  };

  function pushComputedPropsLoose(path, file) {
    const {
      node,
      scope,
      parent
    } = path;
    const {
      left
    } = node;
    let declar, id, intermediate;

    if (_core().types.isIdentifier(left) || _core().types.isPattern(left) || _core().types.isMemberExpression(left)) {
      id = left;
      intermediate = null;
    } else if (_core().types.isVariableDeclaration(left)) {
      id = scope.generateUidIdentifier("ref");
      declar = _core().types.variableDeclaration(left.kind, [_core().types.variableDeclarator(left.declarations[0].id, _core().types.identifier(id.name))]);
      intermediate = _core().types.variableDeclaration("var", [_core().types.variableDeclarator(_core().types.identifier(id.name))]);
    } else {
      throw file.buildCodeFrameError(left, `Unknown node type ${left.type} in ForStatement`);
    }

    const iteratorKey = scope.generateUidIdentifier("iterator");
    const isArrayKey = scope.generateUidIdentifier("isArray");
    const loop = buildForOfLoose({
      LOOP_OBJECT: iteratorKey,
      IS_ARRAY: isArrayKey,
      OBJECT: node.right,
      INDEX: scope.generateUidIdentifier("i"),
      ID: id,
      INTERMEDIATE: intermediate
    });

    const isLabeledParent = _core().types.isLabeledStatement(parent);

    let labeled;

    if (isLabeledParent) {
      labeled = _core().types.labeledStatement(parent.label, loop);
    }

    return {
      replaceParent: isLabeledParent,
      declar: declar,
      node: labeled || loop,
      loop: loop
    };
  }

  function pushComputedPropsSpec(path, file) {
    const {
      node,
      scope,
      parent
    } = path;
    const left = node.left;
    let declar;
    const stepKey = scope.generateUid("step");

    const stepValue = _core().types.memberExpression(_core().types.identifier(stepKey), _core().types.identifier("value"));

    if (_core().types.isIdentifier(left) || _core().types.isPattern(left) || _core().types.isMemberExpression(left)) {
      declar = _core().types.expressionStatement(_core().types.assignmentExpression("=", left, stepValue));
    } else if (_core().types.isVariableDeclaration(left)) {
      declar = _core().types.variableDeclaration(left.kind, [_core().types.variableDeclarator(left.declarations[0].id, stepValue)]);
    } else {
      throw file.buildCodeFrameError(left, `Unknown node type ${left.type} in ForStatement`);
    }

    const template = buildForOf({
      ITERATOR_HAD_ERROR_KEY: scope.generateUidIdentifier("didIteratorError"),
      ITERATOR_COMPLETION: scope.generateUidIdentifier("iteratorNormalCompletion"),
      ITERATOR_ERROR_KEY: scope.generateUidIdentifier("iteratorError"),
      ITERATOR_KEY: scope.generateUidIdentifier("iterator"),
      STEP_KEY: _core().types.identifier(stepKey),
      OBJECT: node.right
    });

    const isLabeledParent = _core().types.isLabeledStatement(parent);

    const tryBody = template[3].block.body;
    const loop = tryBody[0];

    if (isLabeledParent) {
      tryBody[0] = _core().types.labeledStatement(parent.label, loop);
    }

    return {
      replaceParent: isLabeledParent,
      declar: declar,
      loop: loop,
      node: template
    };
  }
});

exports.default = _default;